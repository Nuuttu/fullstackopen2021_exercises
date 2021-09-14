import React, { useState } from 'react'



const Blog = ({blog, addLike, deleteBlog, user}) => {
  const [ showInfo, setShowInfo ] = useState(false)
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
            {user !== null && 
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
    <div className="blogSpace">
      {blog.title} 
      <button style={{float: "right"}} onClick={changeShowInfo}>
        {showInfo === false ? "view details" : "close"}
      </button>
    </div>  
      {showInfo === false ? null : blogInfo()}
  </div>
)}

export default Blog