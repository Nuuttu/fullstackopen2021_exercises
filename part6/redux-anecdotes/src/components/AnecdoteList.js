import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const sortedAnecdotes = state.anecdotes.sort(function (a, b) { return b.votes - a.votes })
    if ( state.filter === 'ALL' ) return ( sortedAnecdotes )
    const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    return filteredAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList