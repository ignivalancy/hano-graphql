import { registerUser, loginUser, logoutUser } from '../../controllers/user';
import pubsub from '../../utilities/subscriptions';

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
                  newUser: String!
                }
                type Subscription {
                  newUser: String
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
    logoutUser,
    newUser(root, payload, context) {
      pubsub.publish('something_changed', { newUser: 'newUser' });
      return 'newUser';
    }
  },
  Subscription: {
    newUser: {
      subscribe: () => pubsub.asyncIterator('something_changed'),
      resolve: (payload) => {
        return payload.newUser;
      },
      // subscribe: withFilter(
      //     () => pubsub.asyncIterator('newUser'),
      //     (root, args, context) => {
      //         logger.log('newUser subscribe', args, context);
      //         return true;
      //     }
      // )
    }
  }
};
