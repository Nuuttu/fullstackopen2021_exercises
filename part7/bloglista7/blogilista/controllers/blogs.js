const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, requestLogger, userExtractor } = require('../utils/middleware')

/* GET BLOGS working */ 
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
  } catch (e) {
    console.log('err', e)
  }
})

/* GET BLOG BY ID maybe works */ 
blogsRouter.get('/:id',  async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch (e) {
    next(e)
  }
})

/* ADD BLOG working*/ 
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
      user: user,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// ADD COMMENT
blogsRouter.post('/:id/comment', async (request, response, next) => {
  console.log('request', request.body)
  console.log('id', request.params.id)
  const body = request.body
  const blogById = await Blog.findById(request.params.id)
  const userById = await User.findById(blogById.user)
  
  if (blogById.comments === null){
    blogById.comments = body.comment
  }
  const comments = blogById.comments.concat(body.comment)
  try{
    const commentedBlog = {
      title: blogById.title,
      author: blogById.author,
      user: userById,
      url: blogById.url,
      likes: blogById.likes,
      comments: comments
    }
    const blog = await Blog.findByIdAndUpdate(request.params.id, commentedBlog, { new: true })
    blog.user = userById
    response.json(blog.toJSON())
  } catch (e) {
    next(e)
  }
})

/* ADD LIKE working */
blogsRouter.put('/:id', async (request, response, next) => {
  
  try {
    /* TEST validating user object with duct tape */
    const test = request.body.user.name
    const body = request.body
    const existingUser = await User.findById(body.user)
    const likedBlog = {
      title: body.title,
      author: body.author,
      user: existingUser,
      url: body.url,
      likes: body.likes + 1,
      comments: body.comments
    }
    const blog = await Blog.findByIdAndUpdate(request.params.id, likedBlog, { new: true })
    blog.user = existingUser
    response.json(blog.toJSON())
  } catch (e) {
    next(e)
  }
})


/* DELETE BLOG works*/ 
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
      response.json(blog.toJSON()) /*status(204).end() */
    } else {
      response.status(401).end()
    }
  } catch (e) {
    next(e)
  }
})

/* DELETE ALL BLOGS working */ 
blogsRouter.delete('/', async (request, response, next) => {
  try {
    await Blog.deleteMany({})
    response.status(200).end()
  } catch (e) {
    next(e)
  }
})



module.exports = blogsRouter