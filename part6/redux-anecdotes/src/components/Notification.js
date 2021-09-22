import React from 'react'


import { connect } from 'react-redux'
/** import { useSelector } from 'react-redux' */

const Notification = (props) => {
  /* const notification = useSelector(state => state.notification) */
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const nuller = <div style={style}>{props.notification}</div>
  return (
    <div >
      {props.notification === null && <div></div>}
      {props.notification !== null && nuller}
    </div>
  )
}

/*
export default Notification
*/
const mapStateToProps = (state) => {
  if (state.notification !== null) {
    return {
      notification: state.notification
    }
  }
  return {
    notification: null
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications