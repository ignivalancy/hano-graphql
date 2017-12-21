import { Meteor } from 'meteor/meteor';

export const typeDefs = `
                # Defines a user profile type and its fields
                type UserProfile {
                 name: String
                }
                type Email {
                  address: String
                  verified: Boolean
                }
                type User {
                  # Description for field
                   _id: String
                  emails: [Email]
                  profile: UserProfile
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
    },
  },
  Mutation: {
    async updateProfile(root, args, { userId }) {
      if (userId) {
        let user = Meteor.users.findOne(userId);
        let profile = { ...user.profile, ...args };
        Meteor.users.update(user._id, { $set: { profile } });
        return { success: true };
      } else {
        throw new Meteor.Error('permission-denied', 'Insufficient rights for this action.');
      }
    },
  },
};
