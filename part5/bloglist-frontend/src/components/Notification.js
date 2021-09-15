import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  if (props.errorMessage === null && props.successMessage === null) {
    return null
  }
  if (props.errorMessage !== null)
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

Notification.propTypes = {
  successMessage: PropTypes.func,
  errorMessage: PropTypes.func,
}


export default Notification