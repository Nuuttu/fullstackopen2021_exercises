import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <h2>filter</h2>
    
        <div><input onChange={handleFilterChange} name='content' /></div>
       
    </div>
  )
}

export default FilterForm