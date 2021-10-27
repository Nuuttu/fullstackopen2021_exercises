import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommentToBlog } from "../reducers/blogReducer"




const CommentForm = (blog) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(blog, comment))
    setComment('')
  }

  const handleInputChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <form onSubmit={addComment}>
      <div>
      <TextField
        label='comment this blog'
        type='text'
        value={comment}
        onChange={handleInputChange}></TextField>
        </div>
      <Button variant='outlined'  type='submit' >add comment</Button>
    </form>
  )
}

export default CommentForm