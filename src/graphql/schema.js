const {makeExecutableSchema} = require("graphql-tools/dist/index");

const {fileLoader, mergeResolvers, mergeTypes} =  require('merge-graphql-schemas');


const path = require('path');

const allTypes = fileLoader(path.join(__dirname, "/api/**/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/**/*.js"));

module.exports = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
})
