import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const good = (event) => {
    dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    dispatch({
      type: 'BAD',

    })
  }

  const reset = () => {
    dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={() => good()}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {useSelector(state => state.good)}</div>
      <div>neutral {useSelector(state => state.ok)}</div>
      <div>bad {useSelector(state => state.bad)}</div>
    </div>
  )
}

export default App