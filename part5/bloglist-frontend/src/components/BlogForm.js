import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
  })

    const handleBlogInputChange = (event) => {
      setNewBlog({ ...newBlog, [event.target.id]: event.target.value })
    }

    const addBlog = (event) => {
      event.preventDefault()
      createBlog(newBlog)
      setNewBlog({
        title: '',
        author: '',
        url: '',
        user: '',
      })
    }

  return (

    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            id='title'
            name='title'
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
            required
            onChange={handleBlogInputChange}
          ></input>
        </div>

        <button type='submit'>save blog</button>
      </form>
    </div>
  )
}

export default BlogForm