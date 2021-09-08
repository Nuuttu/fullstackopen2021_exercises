import React from 'react'

const Notification = (props) => {
  if (props.errorMessage === null && props.successMessage === null) {
    return null
  }
  if (props.errorMessage != null)
    return (
    <div className="error">
      {props.errorMessage}
    </div>
    )
  return (
    <div className="success">
      {props.successMessage}
    </div>
  )
}

export default Notification