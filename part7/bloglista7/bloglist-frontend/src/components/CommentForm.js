import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommentToBlog } from "../reducers/blogReducer"




const CommentForm = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(comment))
  }

  const handleInputChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <form onSubmit={addComment}>
      <input
        type='text'
        value={comment}
        onChange={handleInputChange}></input>
      <input type='submit' >add comment</input>
    </form>
  )
}

export default CommentForm