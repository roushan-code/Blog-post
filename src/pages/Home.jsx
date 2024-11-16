import React from 'react'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/database'

const Home = () => {
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        appwriteService.getPosts([])
        .then((posts) => {
            if(posts)
            setPosts(posts.documents)
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex justify-center'>
                        <h1 className='text-2xl'>No posts found</h1>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
  
}

export default Home