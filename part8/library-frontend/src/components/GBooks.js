
import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS_BOOKS, CREATE_BOOK, SET_BORN_TO, USERS_FAVORITE_GENRE, GENRE_BOOKS } from './queries'
import { useApolloClient, useMutation, useQuery, useLazyQuery } from '@apollo/client'

var gb = []

const GBooks = (props) => {
  const [genre, setGenre] = useState('')
  const [gbooks, setGbooks] = useState(props.books)

  const books = props.books

  /* 
    const [getGenreBooks, { data }] = useLazyQuery(GENRE_BOOKS, {
      variables: { "genre": genre },
      pollInterval: 4000,
    })
   */
  const { loading, error, data, refetch } = useQuery(GENRE_BOOKS, {
    variables: { "genre": genre },
  })


  if (data != undefined) {
    gb = data.genreBooks
  }

  useEffect(() => {
    refetch()
    if (data) setGbooks(data.genreBooks)
  }, [genre])

  if (!props.show) {
    return null
  }

  var genres = []
  books.map((b, i) => {
    b.genres.map((g) => {
      if (!genres.includes(g) && g !== '') { genres.push(g) }
    })
  })

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genre !== '' &&
            gb.map((a, i) =>
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          {
            genre === '' &&
            books.map((a, i) =>
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        {genres.map((g, i) =>
          genre === g
            ?
            <button style={{ color: 'red' }} key={i} onClick={() => {
              if (genre === g) setGenre('')
              else setGenre(g)
            }}>{g}</button>
            :
            <button key={i} onClick={() => {

              if (genre === g) setGenre('')
              else setGenre(g)
            }}>{g}</button>

        )}

      </div>
    </div>
  )
}

export default GBooks