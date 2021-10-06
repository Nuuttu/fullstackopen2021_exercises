import blogService from '../services/blogs'



export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD',
      data: newBlog
    })

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
    'id': '6140b77dc303a8287c961c10'
  }
]

const blogReducer = (state = initialBlogs, action) => {

  switch (action.type) {
  case 'GET_ALL':
    return action.data
  case 'ADD':
    return [...state, action.data]

  default:
    return state
  }
}

export default blogReducer