import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'


import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import { setNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  /* const [loginVisible, setLoginVisible] = useState(false) */



  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('logged in successfully', 'success', 4))
    } catch (e) {
      console.log('error', e)
      dispatch(setNotification('wrong credentials', 'error', 4))
    }
  }

  const logoutButton = () => {
    return (
      <div>
        <p>logged in as <b>{user.name}</b> <button onClick={() => handleLogout()}>logout</button></p>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const loginFormRef = useRef()

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>

      {user === null && loginForm()}
      {user !== null && logoutButton()}
      {user !== null && <BlogForm />}

      <BlogList user={user}/>
    </div>
  )

}

export default App