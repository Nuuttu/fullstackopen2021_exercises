import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [showInfo, setShowInfo] = useState(false)
  const changeShowInfo = () => {
    showInfo === false ? setShowInfo(true) : setShowInfo(false)
  }


  const addLike = (blogObject) => {
    const bo = {
      title: blogObject.title,
      author: blogObject.author,
      user: blogObject.user.id,
      url: blogObject.url,
      likes: blogObject.likes,
    }
    const id = blogObject.id
    dispatch(likeBlog(id, bo))
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`are you sure you wannu delete ${blogObject.title}?`)) {
      dispatch(removeBlog(blogObject))
      /*
      blogService
        .deleteBlog(blogObject.id)
        .catch(error => {
          console.log('fail', error)
          dispatch(setNotification(`failed to delete the blog. << ${error} >>`, 'error', 4))
        })
        .then(b => {
          console.log('deleted', b)
          try {
            //setBlogs(blogs.filter(blog => blog.id !== b.id))
          } catch (e) {
            console.log('error', e)
            dispatch(setNotification('you don\'t have rights to delete this blog', 'error', 4))
          }
          dispatch(setNotification(`deleted blog ${blogObject.title} successfully.`, 'success', 4))
        })
        */
    }
  }

  const blogInfo = () => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <td className='tdtitle'>{blog.title}</td>
            </tr>
            <tr>
              <th className='thlikes'>Likes {blog.likes}</th>
              <td><button className='likeButton' onClick={() => addLike(blog)}>Like</button></td>
            </tr>
            <tr>
              <th>url</th>
              <td className='tdurl'>{blog.url}</td>
            </tr>
            <tr>
              <th>author</th>
              <td className='tdauthor'>{blog.author}</td>
            </tr>
            {user !== null &&
              user.user.username === blog.user.username &&
              <tr>
                <th>
                </th>
                <td>
                  <button onClick={() => deleteBlog(blog)}>Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className='blogDiv'>
      <div className='blogSpace'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <button style={{ float: 'right' }} onClick={changeShowInfo}>
          {showInfo === false ? 'view details' : 'close'}
        </button>
      </div>
      {showInfo === false ? null : blogInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object,
}

export default Blog