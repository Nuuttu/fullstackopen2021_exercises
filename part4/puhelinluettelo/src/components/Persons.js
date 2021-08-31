import React from 'react'

const Persons = (props) => {
    let pts = props.persons.filter(p => p.name.toLowerCase().includes(props.newFilter.toLowerCase()));
    return(
      <div>
        {pts.map((p, i) => <p key={i}>{p.name} {p.number} <button onClick={() => props.deletePerson(p.id)}>delete</button></p>)}
      </div>
    )
  }

export default Persons