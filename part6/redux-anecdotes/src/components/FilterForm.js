import React from 'react'
/* import { useDispatch } from 'react-redux' */
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const FilterForm = (props) => {
  /* const dispatch = useDispatch() */

  const handleFilterChange = (event) => {
    props.filterChange(event.target.value)
  }

  return (
    <div>
      <h2>filter</h2>
    
        <div><input onChange={handleFilterChange} name='content' /></div>
       
    </div>
  )
}

/*
export default FilterForm
*/

export default connect(null, { filterChange })(FilterForm)
