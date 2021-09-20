import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifcationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notifcationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)
/*
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
  
})
*/

export default store