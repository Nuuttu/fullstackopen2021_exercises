import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS_BOOKS, CREATE_BOOK } from './components/queries'

import { gql, useQuery, useMutation } from '@apollo/client'



const App = () => {
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_AUTHORS_BOOKS, {
    pollInterval: 5000
  })


  const [error, setError] = useState(null)

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS_BOOKS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      console.log('errir', error)
    }
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  console.log('resluts', result.data)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={result.data.allAuthors}
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

    </div>
  )
}

export default App