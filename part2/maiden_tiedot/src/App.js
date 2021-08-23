import React, { useState, useEffect  } from 'react'

import axios from 'axios'


const Filter = (props) => {
  return(
  <form >
    <div>
      search countries:
        <input value={props.filterTerm} onChange={props.handleFilterChange} />
    </div>
  </form>
  )
}

const ShowCountries = (props) => {
  let filteredCountries = props.countries.filter(c => c.name.toLowerCase().includes(props.filterTerm.toLowerCase()))
  if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>
  if (filteredCountries.length === 1){
    console.log(filteredCountries[0]);
    let oc = filteredCountries[0];
    console.log('lang', oc.languages)
    console.log('img', oc.flag)
  return (
    <div>
      <h1>{oc.name}</h1>
      <p>capital: <b>{oc.capital}</b></p>
      <p>population: <b>{oc.population}</b></p>
      <h2>languages</h2>
        <ul>
          {oc.languages.map((l, i) => 
            <li key={i}>{l.name}</li>
        )}
        </ul>
        <img src={oc.flag} alt="flag" width="100px" heigth="100px" />
    </div>)
  }
  return (
    <div>
      {filteredCountries.map((c, i) => <div key={i}>{c.name}<button key={i} onClick={() => props.setFilterTerm(c.name)}>show</button></div>)}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ filterTerm, setFilterTerm ] = useState('')
  
  const countryFetch = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(countryFetch, [])

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value)
  }


  return (
    <div>
      <h3>Countries</h3>
      <Filter handleFilterChange={handleFilterChange} />

      <ShowCountries countries={countries} filterTerm={filterTerm} setFilterTerm={setFilterTerm}/>
      
    </div>
  )

}



export default App