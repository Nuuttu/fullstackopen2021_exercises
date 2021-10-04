import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory, Redirect
} from "react-router-dom"
import  { useAnotherHook, useField } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/anecdotes' style={padding}>anecdotes</Link>
      <Link to='/createNew' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const a = anecdotes.find(a => a.id === id)
  return (
    <div>
      <h2>{a.content}</h2>
      <p>{a.author}</p>
      <p>{a.info}</p>
      <p>{a.votes}</p>
      <p><Link to='/anecdotes' >BACK</Link></p>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const history = useHistory()

  
  const [ con, resetCon ] = useField('text')
  const [ aut, resetAut ] = useField('text')
  const [ inf, resetInf ] = useField('text')

  

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: con.value,
      author: aut.value,
      info: inf.value,
      votes: 0
    })
    history.push('/anecdotes')
  }

  const resett = () => {
    resetCon()
    resetAut()
    resetInf()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...con} />
        </div>
        <div>
          author
          <input {...aut} />
        </div>
        <div>
          url for more info
          <input {...inf} />
        </div>
        <button>create</button>
        
      </form>
      <button onClick={() => resett()}>reset</button>
    </div>
  )

}

const Notification = props => {
  const t = props.content
  const text = 'a new anecdote ' + t
  return (
  t !== '' ?
      <div>
        <p>{text}</p>
      </div>
    : null
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification('')
    }, 10000)
    
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>

        <Menu />
        <Notification content={notification} />
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>

          <Route path="/createNew">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;