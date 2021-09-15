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
              <td>{blog.title}</td>
            </tr>
            <tr>
              <th>Likes {blog.likes}</th>
              <td><button onClick={() => addLike(blog)}>Like</button></td>
            </tr>
            <tr>
              <th>url</th>
              <td>{blog.url}</td>
            </tr>
            <tr>
              <th>author</th>
              <td>{blog.author}</td>
            </tr>
            {/** Could use more intrique method for checking if to show the button */}
            {user !== null &&
              user.username === blog.user.username &&
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
    <div>
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
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog