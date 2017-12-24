export const typeDefs = `
                type User {
                  # Description for field
                  _id: String
                  email: String
                }
                type Query {
                  me:User
                }
                type Mutation {
                  updateProfile(
                    name: String!
                  ): SuccessResponse
                }`;

export const resolvers = {
  Query: {
    me(root, args, context) {
      return context.user;
    }
  },
  Mutation: {
    async updateProfile(root, args, { userId }) {
      return { success: true };
    }
  }
};
