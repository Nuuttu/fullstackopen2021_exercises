import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const changeShowInfo = () => {
    showInfo === false ? setShowInfo(true) : setShowInfo(false)
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
        {blog.title}
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