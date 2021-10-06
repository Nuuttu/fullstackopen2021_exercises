import React from 'react'

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  var nuller = <div className={notification ? notification.theme : null}>
    {notification ? notification.text : null}
  </div>
  return (
    <div >
      {notification === null && null}
      {notification !== null && nuller}
    </div>
  )

}


export default Notification