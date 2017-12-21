import axios from 'axios';

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
    async business(root, { longitude, latitude, sort = '0', offset = '0' }, context) {
      const { data } = await axios.post(
        `http://indiecore.ignivadigital.net/api/v1/business/records`,
        {
          userId: 'ogLXurwhuFpw4qj6x',
          token: 'RJuNYkab5G4ocWNSzOhEBcpgcqr2dyUFKIny7Ppib4E',
          longitude,
          latitude,
          sort,
          offset
        }
      );

      if (data.success) return data;

      throw new Error(data.error_text);
    }
  },
  Business: {
    list({ places_list }) {
      return places_list;
    }
  }
};
