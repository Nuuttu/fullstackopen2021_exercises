import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs.sort(function(a, b) { return b.likes - a.likes; }))
      })
      .catch(error => {
        console.log('fail', error);
        setErrorMessage(
          `couldn't get data from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }, [])



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
      setSuccessMessage('logged in successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
    window.location.reload();
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
        console.log('fail', error);
        setErrorMessage(
          `failed to save blog. << ${error} >>`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`added blog - ${returnedBlog.title} - successfully.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      })

  }

  const addLike = (blogObject) => {
    /* REMEMEBERER references... forget not */
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
        console.log('fail', error);
        setErrorMessage(
          `failed to add like to the blog. << ${error} >>`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
      .then(
        setBlogs(
          blogs.map(b =>
            b.id === blogObject.id ? { ...b, likes: bo.likes } : b
          )
        )
      )
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`are you sure you wannu delete ${blogObject.title}?`)) {
      blogService
        .deleteBlog(blogObject.id)
        .catch(error => {
          console.log('fail', error);
          setErrorMessage(
            `failed to delete the blog. << ${error} >>`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
        .then(b => {
          console.log(b)
          setBlogs(blogs.filter(blog => blog.id !== b.id))
          setSuccessMessage(`deleted blog ${blogObject.title} successfully.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000);
        })
    }
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h1>Blogs</h1>

      {user === null && loginForm()}
      {user !== null && logoutButton()}
      {user !== null && blogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )

}

export default App