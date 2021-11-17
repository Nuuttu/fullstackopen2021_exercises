import React, { useState } from 'react'
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
 


  if (!props.show) {
    return null
  }

  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    console.log(name)
    console.log(born)
    console.log('update author...')
    props.setBornTo({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>


      </div>
      <div>
        <h3>Set Birthyear</h3>
        <form onSubmit={submit}>
          <Select
            defaultValue={selectedOption}
            onChange={selectedOption}
            options={options}
          />
          {/*
          <div>
            name
            
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
           */}
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value, 10))}
            />
          </div>

          <button type='submit'>update author</button>
        </form>
        
      </div>
    </div>
  )
}

export default Authors