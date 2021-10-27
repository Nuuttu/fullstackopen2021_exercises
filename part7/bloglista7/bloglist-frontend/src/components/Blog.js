import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [showInfo, setShowInfo] = useState(false)
  const changeShowInfo = () => {
    showInfo === false ? setShowInfo(true) : setShowInfo(false)
  }

  // THIS IS A MONSTROSITY
  const addLike = (blogObject) => {
    const bo = {
      title: blogObject.title,
      author: blogObject.author,
      user: blogObject.user.id,
      url: blogObject.url,
      likes: blogObject.likes,
      comments: blogObject.comments
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
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell >{blog.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Likes {blog.likes}</TableCell>
              <TableCell><Button variant='outlined' color='primary' className='likeButton' onClick={() => addLike(blog)}>Like</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>url</TableCell>
              <TableCell >{blog.url}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>author</TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
            {user !== null &&
              user.user.username === blog.user.username &&
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                  <Button variant='outlined' type='submit' color='secondary' onClick={() => deleteBlog(blog)}>Delete</Button>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div >
      <div >
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Button variant='outlined' style={{ float: 'right' }} onClick={changeShowInfo}>
          {showInfo === false ? 'view details' : 'close'}
        </Button>
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