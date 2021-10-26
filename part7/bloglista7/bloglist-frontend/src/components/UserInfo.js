import React from "react"
import { useSelector } from 'react-redux'
import {

  Link,
  useParams
} from "react-router-dom"



const UserInfo = () => {

  const users = useSelector(state => state.users)
  const id = useParams().id
  
  const usersUser = users.find(user => user.id === id)
  
  
  if (!usersUser) {
    return null
  }

  return(
    <div>
      <h2>{usersUser.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {usersUser.blogs.map(blog => 
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )

}

export default UserInfo