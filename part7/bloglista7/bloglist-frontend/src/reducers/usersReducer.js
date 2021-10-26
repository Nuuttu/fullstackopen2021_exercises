import usersService from '../services/users'


export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

const initialusers = [
  {
    "blogs": [
      {
        "likes": 2,
        "title": "Rads",
        "author": "332",
        "url": "234",
        "id": "61774599d3c84c1eaccfdf1b"
      }
    ],
    "username": "testes",
    "name": "jeejee",
    "id": "6136075380e62f011097b082"
  },
  {
    "blogs": [
      
    ],
    "username": "testes49",
    "name": "jeejee",
    "id": "613607c1956a8f2120b4caeb"
  },
  {
    "blogs": [
      
    ],
    "username": "testes42",
    "name": "jeejee",
    "id": "613608cdd423ca35dc4c684c"
  }
]

const userReducer = (state = initialusers, action) => {

  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer