
import React, { useState } from 'react'

const Recommended = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books



  return (
    <div>
      <h2>books</h2>

  <p>books in your favorite genre: </p>
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