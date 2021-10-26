import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/usersReducer'
import { initializeUser } from './reducers/userReducer'


import { Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import NavigationMenu from './components/NavigationMenu'

const App = () => {
  const dispatch = useDispatch()

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  /* const [loginVisible, setLoginVisible] = useState(false) */

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <NavigationMenu /> 
      <Notification />
      <h1>Blogs</h1>
  
      <Switch>
        <Route path='/users/:id'>
          <UserInfo />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <BlogInfo />
        </Route>
        <Route path='/'>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </div>
  )

}

export default App