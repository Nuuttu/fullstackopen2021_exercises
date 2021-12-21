const { ApolloServer, UserInputError, gql } = require('apollo-server')
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
    name: String!
    born: Int!
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
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    findAuthor(name: String!): Author
    findBook(title: String!): Book
    me: User
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
`

//allBooks(author: String, genre: String): [Book]
// EHKÄ BOOKS TYPE LISÄÄÄ


const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    bookCount: () => Book.collection.countDocuments(),
    findBook: async (root, args) => await Book.findOne({ title: args.title }),
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
    allBooks: async (root, { author, genre }) => {
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
      return await Book.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const au = await Author.findOne({ name: root.name }) //.filter(p => p.author === root.name)
      const li = await Book.find({ author: au })
      return li.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log("addbook")

      
    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

      const book = new Book({ ...args })
      book.author = await Author.findOne({ name: args.author })
      if (book.author != null) {
        try {
          await book.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        }
        return book
      }
      console.log("error")
      return "errro"
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

      const author = await Author.findOne({ name: args.name})
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
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      } 
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})