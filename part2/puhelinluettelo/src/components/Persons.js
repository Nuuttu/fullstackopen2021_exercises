import React from 'react'

const Persons = (props) => {
    let pts = props.persons.filter(p => p.name.includes(props.newFilter));
    return(
      <div>
        {pts.map((p, i) => <p key={i}>{p.name} {p.number}</p>)}
      </div>
    )
  }

export default Persons