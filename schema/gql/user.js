import { registerUser, loginUser, logoutUser } from '../../controllers/user';

export const typeDefs = `
                type User {
                  # Description for field
                  _id: String
                  fullName: String
                  email: String!
                  role: String!
                  loginToken: String
                  lastLogin: String
                }
                type Query {
                  me:User
                }
                type Mutation {
                  registerUser(
                    fullName: String!
                    email: String!
                    password: String!
                    role: String!
                  ): User
                  loginUser(
                    email: String!
                    password: String!
                  ): User
                  logoutUser: String!
                }
                `;

export const resolvers = {
  Query: {
    me(root, payload, context) {
      if (context.auth.isAuthenticated) return context.auth.credentials.user;
      throw new Error(context.auth.message);
    }
  },
  Mutation: {
    registerUser,
    loginUser,
    logoutUser
  }
};
