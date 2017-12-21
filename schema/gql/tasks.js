import { Categories, Tasks } from '../../collections';
import { withFilter } from 'graphql-subscriptions';
import pubsub from '../subscriptions';
import logger from '../../utils/logger';

export const typeDefs = `
                # Description for the type
                type Task {
                  _id: String
                  title: String
                  complete: Boolean
                  created_at: Date
                  updated_at: Date # @deprecated(reason: "Use otherField instead.")
                }
                type Query {
                  tasks : [Task]
                }
                type Mutation {
                  createTask (
                    # Description for argument
                    title: String!
                    cId: String!
                  ): Task
                  toggleTask (
                    tId: String!
                  ): Task
                }
                type Subscription {
                  taskAdded: Task
                }
              `;

export const resolvers = {
  Query: {
    tasks(root, args, context) {
      return Tasks.find({ created_by: 'admin' }).fetch();
    },
  },
  Mutation: {
    async createTask(root, { title, cId }, context) {
      if (Categories.findOne(cId)) {
        const data = {
          title,
          cat_id: cId,
          complete: false,
          created_by: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        };
        const _id = Tasks.insert(data);
        logger.log('subscribe', pubsub);
        pubsub.publish('taskAdded', { taskAdded: { _id, ...data } });
        return { _id, ...data };
      }
      throw new Meteor.Error('mutation-denied', `category - not found`);
    },
    async toggleTask(root, { tId }, context) {
      const task = Tasks.findOne({ _id: tId, created_by: 'admin' });
      if (task) {
        const mods = { complete: !task.complete, updated_at: new Date() };
        Tasks.update({ _id: tId }, { $set: mods });
        return { ...task, ...mods };
      }
      throw new Meteor.Error('mutation-denied', `task - not found`);
    },
  },
  Subscription: {
    taskAdded: {
      subscribe: () => pubsub.asyncIterator('taskAdded'),
      // resolve: (payload) => {
      //     return payload.taskAdded;
      // },
      // subscribe: withFilter(
      //     () => pubsub.asyncIterator('taskAdded'),
      //     (root, args, context) => {
      //         logger.log('taskAdded subscribe', args, context);
      //         return true;
      //     }
      // )
    },
  },
};
