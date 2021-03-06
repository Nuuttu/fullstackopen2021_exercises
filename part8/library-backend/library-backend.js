const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { UniqueDirectiveNamesRule } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./utils/config')

const jwt = require('jsonwebtoken')
const JWT_SECRET = config.SECRET
/* 
const createServer = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
 */
/* 
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
 */

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()


// This `app` is the returned value from `express()`.
/* 
const httpServer = createServer(app);
 */
console.log('connecting to', config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
mongoose.connect(config.MONGODB_URI)
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
 * Saattaisi olla j??rkev??mp???? assosioida kirja ja sen tekij?? tallettamalla kirjan yhteyteen tekij??n nimen sijaan tekij??n id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekij??n nimen
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
    name: String!
    born: Int!
    bookCount: [Book!]!
    id: ID!
  }

  type Book {
    title: String!
    published: String!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allAuthors(name: String, born: Int): [Author!]!
    allBooks(author: String, genre: String): [Book]
    findAuthor(name: String!): Author
    findBook(title: String!): Book
    me: User
    genreBooks(genre: String!): [Book]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    addAuthor(
      name: String!
      born: Int!
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

   type Subscription {
    bookAdded: Book!
  }    
`

//allBooks(author: String, genre: String): [Book]
// EHK?? BOOKS TYPE LIS??????

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return await Author.find({}).populate('bookCount')
    },
    //bookCount: () => Book.collection.countDocuments(),
    findBook: async (root, args) => await Book.findOne({ title: args.title }),
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }).populate('bookCount'),
    allBooks: async (root, { author, genre }) => {
      /* if (author && genre) {
        let li = books.filter(p => p.author === author) // && maybe works
        li = li.filter(p => p.genres.includes(genre))
        return li
      }
      if (!genre && author) {
        return books.filter(p => (p.author === author))

      }
      if (!author && genre) {
        return books.filter(p => p.genres.includes(genre))
      } */
      return await Book.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    genreBooks: async (root, args) => {
      let books = await Book.find({})
      return books.filter(b => (b.genres.includes(args.genre)))
    },
  },
  Author: {
    bookCount: async (root) => {
      //  const cc = Book.collection.countDocuments({ author: root.name }, function (err, c) {
      //    console.log('count', c)
      //  })


      const au = await Author.findOne({ name: root.name }) //.filter(p => p.author === root.name)
      const li = await Book.find({ author: au })
      return li

    }
  },
  Book: {
    author: async (root) => {
      const au = await Author.findById(root.author).populate('bookCount')
      return au
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log("addbook")
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try {
        const book = new Book({ ...args })
        book.author = await Author.findOne({ name: args.author })
        if (book.author != null) {
          try {
            await book.save()
          } catch (e) {
            console.log('e', e)
            throw new UserInputError(e.message, {
              invalidArgs: args,
            })

          }
          nBook = await Book.findOne({ title: args.title })

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        }
        console.log("error")
      } catch (e) {
        throw new UserInputError("Invalid input")
      }
      /* 
      if (!authors.find(p => p.name === args.author)) {
        const author = { name: args.author, born: null, id: uuid()}
        authors = authors.concat(author)
      }
      const book = { ...args, id: uuid()}
      books = books.concat(book)
      return book 
      */
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthor: async (root, args, { currentUser }) => {
      console.log('Editing author: ', args.name, ' born: ', args.setBornTo)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      //authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
      return author.save()
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ]
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})