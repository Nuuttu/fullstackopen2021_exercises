import blogService from '../services/blogs'
import userService from '../services/users'


const userSet = (user) => {

  return({
    type: 'LOGIN',
    data: {
      user: user
    }
  })
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggeduserJsON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      blogService.setToken(user.token)
      dispatch(userSet(user))
    }

  }
}

export const setLoggedUser = (user) => {
  return({
    type: 'LOGIN',
    data: {
      user: user
    }
  })
}

const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'GET_USER':
    return state
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default userReducer