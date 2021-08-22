import React, { useState } from 'react'

const Buttons = (props) => {
const a = { ...props.anecdotes };
/* didn't quire get the object copying part, need to look into it later */
  return (
    <div>
      <p>has {props.anecdotes[props.selected].votes} votes</p>
      <button onClick={() => {
        a[props.selected].votes = a[props.selected].votes + 1;
        props.setAnecdotes({...a});
      }}>vote</button>
      <button onClick={() => {
        props.setSelected(Math.floor(Math.random()* 7));
      }}>next anecdote</button>
    </div>
  )
}


const TopQuote = (props) => {
  
  /* need to familiarize loops with react more */ 
  const top = { ...props.anecdotes }
  let topa = props.anecdotes[0]
  for (let i = 0; i < 7; i++) {
    if (top[i].votes > topa.votes){
      topa = top[i];
    }
  }
    
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{topa.text}</p>
      <p>has {topa.votes} votes</p>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      votes: 0
    }
  ])
   
  const [selected, setSelected] = useState(0)

  /* 
  Should've used the empty array maybe. Just tought it could've been used with 'selected' const
  */

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected].text}
      <Buttons selected={selected} setSelected={setSelected} anecdotes={anecdotes} setAnecdotes={setAnecdotes} />

      <TopQuote anecdotes={anecdotes} />

      
      
    </div>
  )
}

export default App