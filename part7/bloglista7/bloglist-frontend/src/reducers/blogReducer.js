import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'



export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: blogs
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'ADD',
        data: newBlog
      })
      dispatch(setNotification(`added blog - ${content.title} - successfully.`, 'success', 4))
    } catch (error) {
      console.log('fail', error)
      dispatch(setNotification(`failed to save blog. << ${error} >>`, 'error', 4))
    }
  }
}

export const addCommentToBlog = (content) => {
  // ASDASDASDASDASDASDASDASDASDASD HERE NEXT
}

export const likeBlog = (id, bo) => {
  return async dispatch => {
    try{
      const likedBlog = await blogService.update(id, bo)
      dispatch(setNotification('Liked', 'success', 2))
      dispatch({
        type: 'LIKE',
        data: likedBlog,
      })
    } catch (error) {
      console.log('fail', error)
      dispatch(setNotification(`failed to add like to the blog. << ${error} >>`, 'error', 4))
    }

  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    try{
      blogService.deleteBlog(blogObject.id)
      dispatch({
        type: 'DELETE',
        data: blogObject,
      })
      dispatch(setNotification(`succesfully deleted blog >> ${blogObject.title} <<`, 'success', 5))
    } catch (error) {
      console.log('error', error)
      dispatch(setNotification(`failed to delete the blog. << ${error} >>`, 'error', 4))
    }
  }
}

const initialBlogs = [
  {
    'likes': 18,
    'title': '123123',
    'author': '3',
    'user': {
      'username': 'testes',
      'name': 'jeejee',
      'id': '6136075380e62f011097b082'
    },
    'url': '33',
    'id': '6140b77dc303a8287c961c10',
    'comments': 'dsdadasdads'
  }
]

const blogReducer = (state = initialBlogs, action) => {

  switch (action.type) {
  case 'GET_ALL':
    return action.data
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'ADD':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(a => a.id !== action.data.id)
  default:
    return state
  }
}

export default blogReducer