import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  console.log('state', useSelector(state => state))
  const anecdotes = useSelector(state => {
    const sortedAnecdotes = state.anecdotes.sort(function (a, b) { return b.votes - a.votes })
    if ( state.filter === 'ALL' ) return ( sortedAnecdotes )
    const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    return filteredAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    /*
    dispatch(notificationSet('voted'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)
    */
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