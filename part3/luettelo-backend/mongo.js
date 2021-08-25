const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument or passwod, name and number as argument')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
    `mongodb+srv://dbAdmin:${password}@puhelinluettelocluster0.ukhkq.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: newName,
    number: newNumber
})

if (newName != null && newNumber != null) {
person.save().then(response => {
    console.log('contact saved!')
    mongoose.connection.close()
})
} else {
Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
}) 
}

