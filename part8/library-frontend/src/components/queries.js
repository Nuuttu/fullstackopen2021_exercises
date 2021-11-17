import { gql } from '@apollo/client'


export const ALL_AUTHORS_BOOKS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    author
    genres
  }
}
`