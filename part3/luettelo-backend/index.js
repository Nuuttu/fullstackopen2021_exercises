const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (request, req, res) { 
    return JSON.stringify(request.body)
  })

app.use(morgan('tiny', {
  skip: function (req, res) { return req.method === 'POST' }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) { return req.method !== 'POST' }
}))


app.get('/info', (request, response) => {
  const hsend = `
  <div>
      <p>Phonebook has ${persons.length} people's infos here </p>
      <p>${new Date()}</p>
  </div>
  `
  response.send(hsend)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
/*
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  response.json(person)
  */
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  /*
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
  */
})

/*
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  /*
  let persons = Person.find({}).then(persons => {
    return(response.json(persons))
  })
  */
  if (body.name === undefined || body.number === undefined ) {
    return response.status(400).json({ error: 'name, number or both missing' })
  }
  /*
  if (persons.find(p => p.name === body.name) || persons.find(p => p.number === body.number)){
      return response.status(400).json({
          error: 'name and number must be unique'
      })
  }
  */
  const person = new Person({
      name: body.name,
      number: body.number,
  })
  /*
  Person.findByIdAndUpdate(request.params.id, person, { new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  */
  /* persons = persons.concat(person) */
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  /* response.json(person) */
})
/* tehtävä 3.18 done, 3.17 kesken */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})