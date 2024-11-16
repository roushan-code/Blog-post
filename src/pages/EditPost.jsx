import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/database'
import { useSelector } from 'react-redux'

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if(slug){
            appwriteService.getDocument(slug)
            .then((post) => {
                if(post){
                    setPost(post)
                }else{
                    navigate('/')
                }
            })
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} userData={userData} />
        </Container>
    </div>
  ) : null
}

export default EditPost