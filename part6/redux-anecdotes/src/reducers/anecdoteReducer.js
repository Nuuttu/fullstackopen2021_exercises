
/*
const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))
*/

import anecdoteService from "../services/anecdotes"

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
  /*return(
    {
      type: 'ADD',
      data

      /*
      data: {
        newAnecdote: {
          content: content,
          id: generateId(),
          votes: 0
        }
      }
    })*/
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
  /*
  return(
    {
      type: 'VOTE',
      data: {
        id: id 
      }
    })
  */
}



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
  /*
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
  */
}

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'and a test'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type){
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      
      const id = action.data.id
      const changingAnecdote = state.find(a => a.id === id)
      const changedAnecdote = { ...changingAnecdote, votes: changingAnecdote.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      
    case 'ADD':
      return [...state, action.data]
    default:
      return state
  }
}


export default anecdoteReducer