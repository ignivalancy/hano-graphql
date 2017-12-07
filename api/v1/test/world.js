export default {
  method: 'GET',
  path: '/api/v1/test/world',
  handler: async (request, reply) => {
    return reply('hello friend');
  }
};
