import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export const typeDefs = `
                # Business List
                type BusinessRecord {
                  business_id: String
                  name: String
                  location: [String]
                  display_address: String
                  image_url: String
                  types: [String]
                  hasPhoto: Boolean
                  user_count: Int
                  distance: String
                }
                # Indiecore
                type Business {
                  list: [BusinessRecord]
                  places_count: String
                  total_count: String
                }
                type Query {
                  business (
                    longitude: String!
                    latitude: String!
                    sort: String
                    offset: String
                  ): Business
                }`;

export const resolvers = {
  Query: {
    business(root, { longitude, latitude, sort = '0', offset = '0' }, context) {
      const { data } = HTTP.post(`http://indiecorelive.ignivastaging.com/api/v1/business/records`, {
        data: {
          userId: 'J2iyEjdeP5iikLy6q',
          token: 'noy1OssDlGIUwfHVVAHlfhbQUp-nstPVWZPxUHIUfjm',
          longitude,
          latitude,
          sort,
          offset
        }
      });

      if (data.success) return data;

      throw new Meteor.Error('query-failed', data.error_text);
    }
  },
  Business: {
    list({ places_list }) {
      return places_list;
    }
  }
};
