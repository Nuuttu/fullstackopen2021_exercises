import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import {

  Link,
  useParams
} from "react-router-dom"
import { likeBlog } from "../reducers/blogReducer"



const BlogInfo = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)


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

  if (!blog) {
    return null
  }

  return (
    <div>
      
      <table>
      <h2>{blog.title}</h2>
        <tbody>
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
        </tbody>
      </table>
    </div>
  )

}

export default BlogInfo