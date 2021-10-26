import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)



  return (
    <div>
      <h2>Users</h2>

      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Created blogs</th>
              </tr>
            {users.map((user) =>
              <tr key={user.id}>
                <th><Link to={`/users/${user.id}`} >{user.name}</Link></th>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default UserList