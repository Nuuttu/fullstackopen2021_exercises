import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'


const BlogList = () => {
  /*
    const blogs = useSelector(state => {
      const sortedblogs = state.blogs.sort(function (a, b) { return b.likes - a.likes })
      if ( state.filter === 'ALL' ) return ( sortedblogs )
      const filteredblogs = sortedblogs.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      return filteredblogs
    })
  */
  //  const blogs = useSelector(state => state.blogs)

  const u = useSelector(state => state.user)

  const blogs = useSelector(state => {
    const sortedblogs = state.blogs.sort(function (a, b) { return b.likes - a.likes })
    return (sortedblogs)
  })

  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={u} />
      )}

    </div>
  )
}

export default BlogList