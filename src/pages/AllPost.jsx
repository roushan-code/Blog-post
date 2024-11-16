import React from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/database'

const AllPost = () => {
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        appwriteService.getPosts([])
            .then((posts) => {
                // console.log(posts)
                if (posts)
                    setPosts(posts.documents)
            })
    }, [posts])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost