import React, { useState } from 'react'

const Buttons = (props) => {

  return (
    <div>
      <button onClick={() => {props.setGood(props.good + 1)} }>good</button>
      <button onClick={() => {props.setNeutral(props.neutral + 1)} }>neutral</button>
      <button onClick={() => {props.setBad(props.bad + 1)} }>bad</button>
    </div>
  )
}

const Statistics = (props) => {
  const all = ( props.good + props.neutral + props.bad )
  const avg = ( props.good * 1 + props.neutral * 0 + props.bad * -1 ) / ( props.good + props.neutral + props.bad )
  const positive = ( props.good / ( props.good + props.neutral + props.bad ) ) * 100
  if (props.good + props.bad + props.neutral === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={avg} />
        <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  
  return(
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App