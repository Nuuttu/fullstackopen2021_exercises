import React from 'react'
/* import { useDispatch } from 'react-redux'*/
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  /* const dispatch = useDispatch() */

  const addAnecdote = async (event) => {
    event.preventDefault()
    const cont = event.target.content.value
    event.target.content.value = ''

    /*
    dispatch(createAnecdote(cont))
    dispatch(setNotification(`you created '${cont}'`, 3))
    */
    props.createAnecdote(cont)
    props.setNotification(`you created '${cont}'`, 3)

  
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
/*
export default AnecdoteForm
*/

export default connect(null, { setNotification, createAnecdote })(AnecdoteForm)