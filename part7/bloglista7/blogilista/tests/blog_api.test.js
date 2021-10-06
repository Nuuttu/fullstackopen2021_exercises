const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


test('blog identification needs to be id',async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.forEach(b => {
    expect(b.id).toBeDefined()
  })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  
  expect(titles).toContain(
    'Test of Wrath'
  )
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "M Morninen",
    url: "rr.ss",
    likes: 32,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsFromDB = await helper.blogsInDb()
  expect(blogsFromDB).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsFromDB.map(r => r.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})



describe('blog without title or url is not added', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

  test('blog without url is not added',async () => {
    const newBlog = 
      {
        title: 'aa',
        author: 'a'
      }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'a',
      url: '123'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})




test('empty likes default is 0', async () => {
  const newBlog = {
    title: 'test likes',
    author: '2',
    url: 'testurl',
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsFromDB = await helper.blogsInDb()
  expect(blogsFromDB).toHaveLength(helper.initialBlogs.length + 1)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(l => l.likes)
  expect(likes).toContain(
    0
  )

  
})

/*
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})
*/


afterAll(() => {
  mongoose.connection.close()
})
