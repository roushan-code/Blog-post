import React from 'react'
import { Container, PostForm } from '../components'
import { useSelector } from 'react-redux'

const AddPost = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className='py-8'>
        <Container>
            <PostForm userData={userData} />
        </Container>
    </div>
  )
}

export default AddPost
