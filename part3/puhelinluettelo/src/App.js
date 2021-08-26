import React, { useState, useEffect  } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/PersonServices'

const Notification = (props) => {
  if (props.errorMessage === null && props.successMessage === null) {
    return null
  }
  if (props.errorMessage != null)
    return (
    <div className="error">
      {props.errorMessage}
    </div>
    )
  return (
    <div className="success">
      {props.successMessage}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Noconnection', number: '39-44-5323523' },
    /* test */
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  
  const personFetch = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.log('fail', error);
        setErrorMessage(
          `couldn't get data from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }
  useEffect(personFetch, [])

  const addPerson = (e) => {
    e.preventDefault();
    var alreadyExists = false;
    const personObject = { name: newName, number: newNumber }
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName /* || persons[i].number === newNumber */) { 
        /* alert(newName + ' is already added to phonebook'); */
        if (window.confirm(`${newName} already exists. Replace old with new?`)) {
          const pid = persons.find(person => person.name === newName).id
          personService
            .update(pid, personObject)
            .then(response => {
              personFetch();
              setSuccessMessage('updated person successfully')
              setTimeout(() => {
              setSuccessMessage(null) 
                }, 2000)
              })
            .catch(error => {
              console.log('fail', error);
              setErrorMessage(
                `updating ${newName} person failed`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              })
        }
        alreadyExists = true;
        break;
      }
      if (/* persons[i].name === newName || */ persons[i].number === newNumber ) { /* separated for ease */
        /* alert(newName + ' is already added to phonebook'); */
        if (window.confirm(`${newName} already exists. Replace old with new?`)) {
          const pid = persons.find(person => person.number === newNumber).id
          personService
            .update(pid, personObject)
            .then(response => {
              personFetch();
              setSuccessMessage('updated person successfully')
              setTimeout(() => {
              setSuccessMessage(null) 
                }, 2000)
            })
            .catch(error => {
              console.log('fail', error);
              setErrorMessage(
                `updating ${newName} person failed`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              })
        }
        alreadyExists = true;
        break;
      }
    }
    if (!alreadyExists) {
      personService
        .create(personObject)
        .then(returnedPerson => { /* This is the way */ 
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage('added person successfully')
          setTimeout(() => {
            setSuccessMessage(null) 
            }, 2000)
        })
        .catch(error => {
          console.log('fail', error);
          setErrorMessage('error happened: ' + error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewNumber('');
    setNewName('');
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id).name
    if (window.confirm('Wanna delete ' + personToDelete + '?' )) {
      personService
        .deleteService(id)
        .then(response => { 
          personFetch()
          setSuccessMessage(`deleted ${personToDelete} person successfully`)
          setTimeout(() => {
            setSuccessMessage(null) 
            }, 2000)
        }) /* this is the way, almost... */
        .catch(error => {
          console.log('fail', error);
          setErrorMessage(
            `No ${personToDelete} found on the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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