const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const Product = require('./db.js');

const resolvers = {
  Query: {
    getAllProducts: Product.list,
    product: Product.get,
  },
  Mutation: {
    addProduct: Product.add,
    updateProduct: Product.update,
    deleteProduct: Product.delete,
  },
};

/* Initial Server setup */
const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const setApplication = (app) => {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
};

module.exports = { setApplication };