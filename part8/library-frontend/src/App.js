import { useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import GBooks from './components/GBooks'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { ALL_AUTHORS_BOOKS, CREATE_BOOK, SET_BORN_TO, USERS_FAVORITE_GENRE, GENRE_BOOKS, BOOK_ADDED } from './components/queries'
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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert('Book added: ' + subscriptionData.data.bookAdded.title)
      console.log(subscriptionData)
    }
  })

  const [token, setToken] = useState(null)
  // localStorage.getItem('library-user-token', token)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS_BOOKS, {
    pollInterval: 9000
  })
  const userData = useQuery(USERS_FAVORITE_GENRE)
  if (token) {

  }

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
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 7000)
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
  console.log('userdata', userData.data)
  /* 
  console.log('token', token)
  console.log('error', error)
  console.log('error', errorMessage)
 */


  return (
    <div>

      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        {/* <button onClick={() => setPage('books')}>books</button> */}
        <button onClick={() => setPage('gbooks')}>books</button>
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

      <GBooks
        books={result.data.allBooks}
        show={page === 'gbooks'}
      />

      <NewBook
        createBook={createBook}
        show={page === 'add'}
      />

      <Recommended
        token={token}
        books={result.data.allBooks}
        userData={userData.data}
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