import React from 'react'

const BlogForm = ({onSubmit, handleChange, value}) => {

  return (

    <div>
      <h2>Add a blog</h2>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          title
          <input
            type='text'
            id='title'
            name='title'
            onChange={handleBlogInputChange}
          ></input>
        </div>
        <div>
          author
          <input
            type='text'
            id='author'
            name='author'
            onChange={handleBlogInputChange}
          ></input>
        </div>
        <div>
          url
          <input
            type='text'
            id='url'
            name='url'
            onChange={handleBlogInputChange}
          ></input>
        </div>

        <button type='submit'>save blog</button>
      </form>
    </div>
  )
}

export default BlogForm