import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from '../index'
import RTE from '../RTE'
import appwriteService from '../../appwrite/database'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post, userData }) => {
    console.log(post)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            // featuredImage: "",
            status: post?.status || "active"
        }
    })
    

    const navigate = useNavigate()

    console.log(userData)
    

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                await appwriteService.deleteFile(post.featuredImage).then(() =>
                    console.log("Image Deleted"))
            }
            console.log(data)
            console.log(file)
            await appwriteService.updateDocument(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            }).then((data) => (
                // console.log(data)
                navigate(`/post/${data.$id}`)
            ))


        } else {
            await appwriteService.uploadFile(data.image[0]).then(async (file) => {
                const fileId = file.$id
                data.featuredImage = fileId
                // console.log(data)
                await appwriteService.createDocument({
                    ...data,
                    userId: userData.$id
                }).then((dbPost) => {
                    navigate(`/post/${dbPost.$id}`)
                })
            })

        }

    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

            return ''
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') setValue('slug',
                slugTransform(value.title, { shouldValidate: true }))

        })

        // Set the default value for slug
        setValue('slug', slugTransform(getValues('title')), { shouldValidate: true });

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue, getValues])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm