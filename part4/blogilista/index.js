const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./models/blog')
const notesRouter = require('express').Router()

const server = http.createServer(app)

module.exports = blogsRouter

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})