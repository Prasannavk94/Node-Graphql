const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const lambda = require("netlify-lambda");

const User = require("./schema/user.schema");
const server = new ApolloServer(User);

const dataBase = require("./config");

dataBase.on("error", console.error.bind(console, "connection error:"));

dataBase.once("open", function() {
	console.log("We're connected!!");
});

const app = express();
server.applyMiddleware({
	app,
	path: "/users"
});

app.listen({ port: 3000 }, () =>
	console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
);

module.exports.handler = lambda(app);
