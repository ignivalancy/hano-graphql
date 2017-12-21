export const typeDefs = `
					type Query {
					  say (
                			something: String!
              			): String
					}`;

export const resolvers = {
  Query: {
    say(root, { something }, context) {
      return `hello ${something}`;
    },
  },
};
