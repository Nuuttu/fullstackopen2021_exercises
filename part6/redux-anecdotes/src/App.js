import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
    /*
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    */
  }, [dispatch])

  return (
    <div>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App