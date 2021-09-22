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

const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

const notificationSet = text => {
  return {
    type: 'SET_TEXT',
    text,
  }
}

var timer = 0
export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(notificationSet(text))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(hideNotification())
      
    }, time*1000)
  }
}

export default notifcationReducer