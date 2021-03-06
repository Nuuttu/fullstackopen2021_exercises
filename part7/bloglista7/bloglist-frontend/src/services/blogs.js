import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  /** no authorization required atm
  const config = {
    headers: { Authorization: token },
  }
  */
  const putUrl = baseUrl + '/' + id
  const response = await axios.put(putUrl, newObject)
  return response.data
  /*
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
  */
}

const comment = async (blog, comment) => {

  const postUrl = baseUrl + '/' + blog.blog.id + '/comment'
  console.log('posturl', postUrl)
  const c = { 'comment': comment }
  const response = await axios.post(postUrl, c)
  return response.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + id
  const response = await axios.delete(url, config)
  return response.data
}

const blogService = { getAll, create, update, setToken, deleteBlog, comment }

export default blogService