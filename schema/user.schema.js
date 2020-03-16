const { gql } = require("apollo-server-lambda");
const user = require("../models/users.model");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type User {
		_id: String
		mobile: ID
		username: String
		password: String
	}

	type Query {
		users: [User]
	}

	type Mutation {
		add(username: String!, mobile: ID!, password: String!): User!

		updateUser(username: String, mobile: ID, password: String): User!

		deleteUser(_id: String!): User!
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		users: async () => await user.find({}).exec()
	},
	Mutation: {
		add: async (parent, args) => {
			return await user.create({
				username: args.username,
				password: args.password,
				mobile: args.mobile
			});
		},
		updateUser: async (parent, args) => {
			return await user.updateOne(
				{
					_id: args._id
				},
				{
					username: args.username,
					mobile: args.mobile,
					password: args.password
				}
			);
		},
		deleteUser: async (parent, args) => {
			return await user.deleteOne({
				_id: args._id
			});
		}
	}
};

const User = { typeDefs, resolvers, introspection: true, playground: true };

module.exports = User;
