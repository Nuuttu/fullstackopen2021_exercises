const Blog = require('../models/blog')


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



const totalLikes = (blogs) => {
  var likes = 2
  var likearray = []
  blogs.map((b, i) => {
    likearray = likearray.concat(b.likes)
  })
  likes = likearray.reduce((a, c) => a + c)

  return likes
}

const { sum } = require('lodash')
var _ = require('lodash');
const mostBlogs = (blogs) => {
  blogsArray = []
  blogs.map((b, i) => {
    blogsArray = blogsArray.concat({ author: b.author })
  })
  /* https://stackoverflow.com/questions/44649137/lodash-add-keys-to-countby-function */
  var countArray = _.map(_.countBy(blogsArray, "author"), (count, name) => ({ author: name, blogs: count }))
  /* https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects */
  const a = countArray.reduce(function (prev, current) {
    return (prev.blogs > current.blogs) ? prev : current
  })
  return a
}

const mostLikes = (blogs) => {
  authorArray = []
  blogs.map((b, i) => {
    authorArray = authorArray.concat({ author: b.author, likes: b.likes })
  })
  /* https://stackoverflow.com/questions/38774763/using-lodash-to-sum-values-by-key */
  var out =
    _(authorArray)
      .groupBy('author')
      .map((o, key) => ({
        author: key,
        'likes': _.sumBy(o, 'likes')
      }))
      .value();
  /* https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects */
  const a = out.reduce(function (prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })
  return a
}

module.exports = {
  totalLikes,
  mostBlogs,
  mostLikes,
  nonExistingId,
  blogsInDb,
  initialBlogs,
}