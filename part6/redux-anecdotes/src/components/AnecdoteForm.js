import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('add', event.target.content.value)
    const cont = event.target.content.value
    event.target.content.value = ''
    /*
    const newAnecdote = await anecdoteService.create(cont)
    console.log('newAnecdote', newAnecdote)
    */
    dispatch(createAnecdote(cont))
    dispatch(setNotification(`you created '${cont}'`, 3))
    /*
    dispatch(notificationSet('created a new anecdote'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)
    */
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