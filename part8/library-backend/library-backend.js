const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { UniqueDirectiveNamesRule } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = ''
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: String!
    author: Author!
    genres: [String!]!
    id: ID!
  }


  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    findAuthor(name: String!): Author
    findBook(title: String!): Book
  }

  type Mutation {
    addBook(
      title: String
      published: Int
      author: String
      genres: [String]
    ): Book
    editAuthor(
      name: String
      setBornTo: Int
    ): Author
  }
`

//allBooks(author: String, genre: String): [Book]
// EHKÄ BOOKS TYPE LISÄÄÄ


const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: (root, args) => {
      return authors
    },
    bookCount: () => books.length,
    findBook: (root, args) => books.find(p => p.title === args.title),
    findAuthor: (root, args) => authors.find(p => p.name === args.name),
    allBooks: (root, { author, genre } ) => {
      if (author && genre) {
        let li = books.filter(p => p.author === author) // && maybe works
        li = li.filter(p => p.genres.includes(genre))
        return li
      }
      if (!genre && author) {
        return books.filter(p => (p.author === author))
        
      }
      if (!author && genre) {
        return books.filter(p => p.genres.includes(genre))
      }
      return books
    }
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) => {
      const li = books.filter(p => p.author === root.name)
      return li.length
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(p => p.name === args.author)) {
        const author = { name: args.author, born: null, id: uuid()}
        authors = authors.concat(author)
      }
      const book = { ...args, id: uuid()}
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      console.log('Editing author: ', args.name, ' born: ', args.setBornTo)
      const author = authors.find(p => p.name === args.name)
      if (!author) { 
        return null 
      }
      const updatedAuthor = { ...author, born: args.setBornTo}
      authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
      return updatedAuthor
      
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})