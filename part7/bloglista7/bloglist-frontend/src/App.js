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

  const [blogs, setBlogs] = useState([])

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
    } catch (exception) {
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

  const blogFormRef = useRef()
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef} >
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
    )
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .catch(error => {
        console.log('fail', error)
        dispatch(setNotification(`failed to save blog. << ${error} >>`, 'error', 4))
      })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setNotification(`added blog - ${returnedBlog.title} - successfully.`, 'success', 4))
      })

  }
  /**
  const addLike = (blogObject) => {
    const bo = {
      title: blogObject.title,
      author: blogObject.author,
      user: blogObject.user.id,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    }

    blogService
      .update(blogObject.id, bo)
      .catch(error => {
        console.log('fail', error)
        dispatch(setNotification(`failed to add like to the blog. << ${error} >>`, 'error', 4))
      })
      .then(
        setBlogs(
          blogs.map(b =>
            b.id === blogObject.id ? { ...b, likes: bo.likes } : b
          )
        )
      )
      .then(dispatch(setNotification('Liked', 'success', 2)))
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`are you sure you wannu delete ${blogObject.title}?`)) {
      blogService
        .deleteBlog(blogObject.id)
        .catch(error => {
          console.log('fail', error)
          dispatch(setNotification(`failed to delete the blog. << ${error} >>`, 'error', 4))
        })
        .then(b => {
          console.log(b)
          try {
            setBlogs(blogs.filter(blog => blog.id !== b.id))
          } catch (e) {
            console.log('error', e)
            dispatch(setNotification('you don\'t have rights to delete this blog', 'error', 4))
          }
          dispatch(setNotification(`deleted blog ${blogObject.title} successfully.`, 'success', 4))
        })
    }
  }
*/
  return (
    <div>
      <Notification />
      <h1>Blogs</h1>

      {user === null && loginForm()}
      {user !== null && logoutButton()}
      {user !== null && blogForm()}

      <BlogList user={user}/>
    </div>
  )

}

export default App