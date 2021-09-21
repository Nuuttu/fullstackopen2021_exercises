import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
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
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store