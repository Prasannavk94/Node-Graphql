"use strict";
const { ApolloServer } = require("apollo-server-lambda");
const serverless = require("serverless-http");

const User = require("./schema/user.schema");
const server = new ApolloServer(User);

const dataBase = require("./config");

dataBase.on("error", console.error.bind(console, "connection error:"));

dataBase.once("open", function() {
	console.log("We're connected!!");
});

exports.handler = server.createHandler();
