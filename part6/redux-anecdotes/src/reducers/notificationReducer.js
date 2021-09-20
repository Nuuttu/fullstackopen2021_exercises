const notifcationReducer = (state = null, action) => {
  
  switch (action.type) {
    case 'HIDE':
      return null
    case 'SET_TEXT':
      return action.text
    default:
      return state
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

export const notificationSet = text => {
  return {
    type: 'SET_TEXT',
    text,
  }
}

export default notifcationReducer