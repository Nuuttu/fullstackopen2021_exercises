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


var _ = require('lodash');
const mostBlogs = (blogs) => {
  blogsArray = []
  blogs.map((b, i) => {
    blogsArray = blogsArray.concat(b.author)
  })
  console.log('array', blogsArray)
  console.log(_.countBy(blogsArray))
  

  const theAuthor = blogsArray[blogsArray.length-1]
  return theAuthor
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}