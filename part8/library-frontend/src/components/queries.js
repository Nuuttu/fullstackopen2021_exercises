import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    published
    author {
      name
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS_BOOKS = gql`
query {
  allAuthors {
    name
    born
    id
    bookCount {
      title
      published
    }
  }
  allBooks {
    title
    genres
    published
    author {
      name
    }
  }
}
`

export const GENRE_BOOKS = gql`
query genreBooks($genre: String!) {
  genreBooks(genre: $genre) {
    title
    genres
    published
    author {
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
  }
}
`

export const SET_BORN_TO = gql`
mutation setBornTo($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USERS_FAVORITE_GENRE = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`