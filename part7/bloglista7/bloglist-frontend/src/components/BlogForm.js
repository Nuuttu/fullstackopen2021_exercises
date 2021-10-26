import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
  })

  const handleBlogInputChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.id]: event.target.value })
  }

  const blogFormRef = useRef()

  const createNewBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog(newBlog))
    setNewBlog({
      title: '',
      author: '',
      url: '',
      user: '',
    })
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) return null

  return (
    <Togglable buttonLabel='create a new blog' ref={blogFormRef} >
      <div className='blogFormDiv'>
        <h2>Add a blog</h2>
        <form onSubmit={createNewBlog}>
          <div>
            title
            <input
              type='text'
              id='title'
              name='title'
              value={newBlog.title}
              required
              onChange={handleBlogInputChange}
            ></input>
          </div>
          <div>
            author
            <input
              type='text'
              id='author'
              name='author'
              value={newBlog.author}
              required
              onChange={handleBlogInputChange}
            ></input>
          </div>
          <div>
            url
            <input
              type='text'
              id='url'
              name='url'
              value={newBlog.url}
              required
              onChange={handleBlogInputChange}
            ></input>
          </div>

          <button type='submit'>save blog</button>
        </form>
      </div>
    </Togglable>
  )
}


export default BlogForm