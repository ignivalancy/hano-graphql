export default {
  method: 'GET',
  path: '/world',
  handler: function(request, reply) {
    return reply('hello friend');
  }
};
