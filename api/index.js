import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { Query, Mutation } from './Model.js'

import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schemaQL.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { GraphQLScalarType } from 'graphql'
const clave = 'pwdISCOOL'
const app = express()
app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.use(express.static('public'))

// resolvers
const resolvers = {
  Upload: GraphQLUpload,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    }
  }),

  Query: { ...Query },

  Mutation: { ...Mutation }
}

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req }) => {
      const token = req.headers.authorization || ''
      const payload = verify(token)
      if (payload.info?.check) {
        return {
          token,
          id: payload.info._id,
          code: 202
        }
      }
      return {
        token,
        id: null,
        code: 401
      }
    }
  })
  await server.start()

  app.use(graphqlUploadExpress())

  server.applyMiddleware({ app })

  // eslint-disable-next-line promise/param-names
  await new Promise(r => app.listen({ port: 5000 }, r))

  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}

startServer()

const verify = (token) => {
  let result
  jwt.verify(token, clave, (err, data) => {
    if (err) {
      result = { status: 'No' }
      return
    }
    result = { status: 'Ok', info: data }
  })

  return result
}
