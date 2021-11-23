import React, { useState } from 'react'
import Select from 'react-select';



const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
 
 

  if (!props.show) {
    return null
  }

  const authors = props.authors

  let options = 
    authors.map(a => { return {"value": a.name, "label": a.name}  })
  

  const handleOptionChange = (e) => {
    console.log('e',e)
    setSelectedOption(e.value)
    setName(e.value)
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('update author...', name, ' born: ', born)
    props.setBornTo({ variables: { name, born } })
    //props.createBook({ variables: {title, published, author, genres}})
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
            onChange={handleOptionChange}
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
              type='number'
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