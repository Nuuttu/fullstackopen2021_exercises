const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, requestLogger, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
  } catch (e) {
    console.log('err', e)
  }
})

blogsRouter.get('/:id',  async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user.id.toString() ){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/', async (request, response, next) => {
  try {
    await Blog.deleteMany({})
    response.status(200).end()
  } catch (e) {
    next(e)
  }
})

/* add user func */
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    user: body.user,
    url: body.url,
    likes: body.likes,
  }
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(blog)
  } catch (e) {
    next(e)
  }
})


module.exports = blogsRouter