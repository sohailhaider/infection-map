
const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./src/resolvers');
const { prisma } = require('./src/generated/prisma-client');

// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || 'World'}`,
//   },
// }

const server = new GraphQLServer({ 
  typeDefs: './schema.graphql', resolvers,
  context: request => ({
    ...request,
    prisma
  }), })
server.start({port: 4500}, ({port}) => console.log('Server is running on localhost:'+port))