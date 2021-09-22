import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (content) => {
 const object = { content: content, votes: 0 }
 const response = await axios.post(baseUrl, object)
 return response.data


 /*
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
  */
}

const vote = async (id) => {
  const gotAnecdote = await axios.get(`${baseUrl}/${id}`)
  const votedAnecdote = gotAnecdote.data
  votedAnecdote.votes = votedAnecdote.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response.data
}

/*
const update = (id, anecdote) => {
  const request = axios.put(`${baseUrl}/${id}`, anecdote)
  return request.then(response => response.data)
}
*/

const deleteService = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const anecdoteService = { getAll, create, vote, deleteService }

export default anecdoteService;