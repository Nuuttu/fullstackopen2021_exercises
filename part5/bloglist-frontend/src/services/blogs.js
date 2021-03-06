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
  */
  const putUrl = baseUrl + '/' + id
  const response = await axios.put(putUrl, newObject)
  return response.data
  /*
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
  */
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + id
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog }