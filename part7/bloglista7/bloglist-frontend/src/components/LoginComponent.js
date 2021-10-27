import React, { useState, useRef } from 'react'
import LoginForm from './LoginForm'
import Togglable from './Togglable'


import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import {  setLoggedUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

const LoginComponent = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

      dispatch(setLoggedUser(user))
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
        <p>logged in as <b>{user.user.name}</b> <Button variant='outlined' onClick={() => handleLogout()}>logout</Button></p>
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
      {user === null && loginForm()}
      {user !== null && logoutButton()}
    </div>
  )
}

export default LoginComponent