import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
    likes: 0,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
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

  const getBlogData = () => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
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
  }

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }
 /*
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  */

  /*
  const loginForm = () => {
    if (user === null) {
      return (
        <div>
          <h2>log in</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
  }
  */

  const handleBlogInputChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.id]: event.target.value })
  }

  const handleBlogFormSubmit = (event) => {
    event.preventDefault();
    try {
      blogService.create(newBlog)
      
      
      setSuccessMessage('successfully added the blog')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (e) {
      console.log('error', e)
      setSuccessMessage('failed to add the blog')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      getBlogData()
    }
  }

  const blogForm = () => {
    if (user !== null) {
      return (

        <div>
          <p>logged in as {user.name}
            <button onClick={() => handleLogout()}>Logout</button>
          </p>
          <form onSubmit={handleBlogFormSubmit}>
            <div>
              title
              <input
                type='text'
                id='title'
                name='title'
                onChange={handleBlogInputChange}
              ></input>
            </div>
            <div>
              author
              <input
                type='text'
                id='author'
                name='author'
                onChange={handleBlogInputChange}
              ></input>
            </div>
            <div>
              url
              <input
                type='text'
                id='url'
                name='url'
                onChange={handleBlogInputChange}
              ></input>
            </div>

            <button type='submit'>save blog</button>
          </form>
        </div>
      )
    }
  }


  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h1>Blogs</h1>
      
      <Togglable buttonLabel='login' user={user}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      </Togglable>

      {blogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App