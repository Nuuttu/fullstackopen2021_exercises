const http = require('http')
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')


const app = express()

let persons = [
    {
        id: 1,
        name: 'Arto Hellas', 
        number: '040-123456' 
    },
    {
        id: 2,
        name: 'Ada Noconnection', 
        number: '39-44-5323523' 
    },
    {
        id: 5,
        name: "Moejst Hanan",
        number: "123-3030303"
      
    },
    {
        id: 6,
        name: "Jaano Arre",
        number: "030-2334455"
    }
  ]

  app.use(cors())
  app.use(express.json())
  app.use(express.static('build'))

  morgan.token('body', function (request, req, res) { 
      return JSON.stringify(request.body)
    })

  app.use(morgan('tiny', {
    skip: function (req, res) { return req.method === 'POST' }
  }))
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: function (req, res) { return req.method !== 'POST' }
  }))



  app.get('/info', (req, res) => {
    const hsend = `
    <div>
        <p>Phonebook has ${persons.length} people's infos here </p>
        <p>${new Date()}</p>
    </div>
    `
    res.send(hsend)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name, number or both missing' 
      })
    }
    if (persons.find(p => p.name === body.name) || persons.find(p => p.number === body.number)){
        return response.status(400).json({
            error: 'name and number must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)