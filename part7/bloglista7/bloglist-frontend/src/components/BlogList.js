import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { getBlogs } from '../reducers/blogReducer'

const BlogList = user => {
/*
  const blogs = useSelector(state => {
    const sortedblogs = state.blogs.sort(function (a, b) { return b.likes - a.likes })
    if ( state.filter === 'ALL' ) return ( sortedblogs )
    const filteredblogs = sortedblogs.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    return filteredblogs
  })
*/
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  /*
  const addLike = (blog) => {
    //dispatch(likeBlog(blog.id))
    dispatch(setNotification(`you liked '${blog.content}'`, 3))
  }
  */

  const addLike = (blogObject) => {
    /* REMEMEBERER references... forget not */
    const bo = {
      title: blogObject.title,
      author: blogObject.author,
      user: blogObject.user.id,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    }

    blogService
      .update(blogObject.id, bo)
      .catch(error => {
        console.log('fail', error)
        dispatch(setNotification(`failed to add like to the blog. << ${error} >>`, 'error', 4))
      })
      /*.then(
        setBlogs(
          blogs.map(b =>
            b.id === blogObject.id ? { ...b, likes: bo.likes } : b
          )
        )
      )*/

      .then(dispatch(setNotification('Liked', 'success', 2)))
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`are you sure you wannu delete ${blogObject.title}?`)) {
      blogService
        .deleteBlog(blogObject.id)
        .catch(error => {
          console.log('fail', error)
          dispatch(setNotification(`failed to delete the blog. << ${error} >>`, 'error', 4))
        })
        .then(b => {
          console.log(b)
          try {
            //setBlogs(blogs.filter(blog => blog.id !== b.id))
          } catch (e) {
            console.log('error', e)
            dispatch(setNotification('you don\'t have rights to delete this blog', 'error', 4))
          }
          dispatch(setNotification(`deleted blog ${blogObject.title} successfully.`, 'success', 4))
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLike={addLike} user={user} />
      )}

    </div>
  )
}

export default BlogList