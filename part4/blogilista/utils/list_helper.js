const totalLikes = (blogs) => {
  var likes = 2
  var likearray = []
  blogs.map((b, i) => {
    likearray = likearray.concat(b.likes)
  })
  likes = likearray.reduce((a, c) => a + c)

  return likes
}

const favoriteBlog = (blogs) => {
  var highlike = blogs[0]
  blogs.map((b, i) => {
    if (b.likes >= highlike.likes) {
      highlike = b
    }
  })
  return (highlike)
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
  favoriteBlog,
  mostBlogs,
  mostLikes,
}