
import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books

  var genres = []
  books.map((b, i) => {
    b.genres.map((g) => {
      if (!genres.includes(g)) { genres.push(g) }
    })
  })

  //var genre = ""

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
          {books.map((a, i) => {
            return (
              genre === '' ?
                <tr key={i}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
                : a.genres.includes(genre) &&
                <tr key={i}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
            )
          }
          )}
        </tbody>
      </table>
      <div>
        {genres.map((g, i) =>
          genre === g 
          ? 
          <button style={{color: 'red'}} key={i} onClick={() => {
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

export default Books