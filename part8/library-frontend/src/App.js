import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { ALL_AUTHORS_BOOKS, CREATE_BOOK, SET_BORN_TO } from './components/queries'
import Recommended from './components/recommended'


const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS_BOOKS, {
    pollInterval: 9000
  })
  const client = useApolloClient()

  const [error, setError] = useState(null)

  const [setBornTo] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_AUTHORS_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      console.log('errir', error)
    }
  })

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      console.log('errir', error)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  /* 
    if (!token) {
      return (
        <div>
          <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm
            setToken={setToken}
            setError={notify}
          />
        </div>
      )
    }
   */
  console.log('resluts', result.data)

  return (
    <div>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <button onClick={() => setPage('add')}>add book</button>
        }
        {token &&
          <button onClick={() => setPage('recommended')}>recommended</button>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
        {token &&
          <button onClick={logout}>
            logout
          </button>
        }
      </div>

      <Authors
        authors={result.data.allAuthors}
        setBornTo={setBornTo}
        show={page === 'authors'}
      />

      <Books
        books={result.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        createBook={createBook}
        show={page === 'add'}
      />

      <Recommended
        token={token}
        books={result.data.allBooks}
        show={page === 'recommended'}
      />

      <LoginForm
        setToken={setToken}
        setError={notify}
        show={page === 'login'}
      />

    </div>
  )
}

export default App