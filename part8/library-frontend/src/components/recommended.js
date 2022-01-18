
import React, { useState } from 'react'

const Recommended = (props) => {
  //console.log('genre', genre)

  if (!props.show) {
    return null
  }

  const books = props.books



  return (
    <div>
      <h2>books</h2>

      <p>books in your favorite genre: <b>{props.favoriteGenre}</b></p>
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
              a.genres.includes(props.favoriteGenre) &&
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>

            )
          })}
        </tbody>
      </table>

    </div>
  )
}

export default Recommended