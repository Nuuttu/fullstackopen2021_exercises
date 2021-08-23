import React, { useState, useEffect  } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/PersonServices'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Noconnection', number: '39-44-5323523' },
    /* test */
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
  const personFetch = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }
  useEffect(personFetch, [])

  const addPerson = (e) => {
    e.preventDefault();
    var alreadyExists = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName || persons[i].number === newNumber ) {
        alert(newName + ' is already added to phonebook');
        alreadyExists = true;
        break;
      }
    }
    const personObject = { name: newName, number: newNumber }
    if (!alreadyExists) {
      personService
        .create(personObject)
        .then(
          personFetch()
        )
    }
    setNewNumber('');
    setNewName('');
  }

  const deletePerson = (id) => {
    console.log('id to del', id)
    console.log('name to delete', persons.find(person => person.id === id).name )
    if (window.confirm('Wanna delete ' + persons.find(person => person.id === id).name + '?' )) {
    personService
      .deletePerson(id)
      .then(personFetch())
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}/>
      <h1>add a new</h1>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter}
        deletePerson={deletePerson}/>
    </div>
  )

}

export default App