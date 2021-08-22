import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'







const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
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
    if (!alreadyExists) setPersons(persons.concat({ name: newName , number: newNumber }));
    setNewNumber('');
    setNewName('');
    
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h1>add a new</h1>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}/>
      
    </div>
  )

}

export default App