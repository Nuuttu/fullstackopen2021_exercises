import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, notificationSet } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('add', event.target.content.value)
    const cont = event.target.content.value
    dispatch(createAnecdote(cont))
    dispatch(notificationSet('created a new anecdote'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm