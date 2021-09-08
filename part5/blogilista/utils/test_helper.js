const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    "title": "Test of Wrath",
    "author": "TT Tilke",
    "url": "ex.test1",
    "likes": 32,
  },
  {
    "title": "Test of Wrath 2",
    "author": "TT Jolke",
    "url": "ex.test",
    "likes": 12,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "this too", url: "with this", likes: "ayay", })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialBlogs,
}