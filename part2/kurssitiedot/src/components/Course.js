import React from 'react'


const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
       {props.parts.map((p, i) => 
         <div key={i}>
          <Part part={p.name} exercises={p.exercises} />
         </div>
       )}

    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return (
    <p><b>Number of exercises {total}</b></p>
  )
}

const Course = (props) => {
  const courses = props.courses
  return (
    <div>
      {courses.map( (course, i) => 
          <div key={i} id={i}>
            <Header key={course.id} course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )}

    </div>
  )
}

export default Course