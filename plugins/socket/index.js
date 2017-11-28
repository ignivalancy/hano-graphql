/* -----------------------------------------------------------------------
   * @ description : This file defines socket handlers.
----------------------------------------------------------------------- */

// import Joi from 'joi';
import socketIO from 'socket.io';
// import _ from 'underscore';
// import eventEmitter from '../../utilities/events';
// import logger from '../../utilities/logger';
// import * as socketHandler from './handler';

const Socket = {
  register: function(server, options, next) {
    // Opening the socket connection

    let io = socketIO(server.select('ws').listener),
      users = {},
      sockets = {};

    io.on('connection', function(socket) {
      let socket_id = socket.id;
      // console.log(socket_id)

      /** ******** on authenticate event registering user's socket id in user object and currently running instance *******/
      socket.on('authenticate', function(query, callback) {
        // let request = {
        //     token: query['x-logintoken'],
        //     socket_id: socket.id,
        // };
        let user_id = 'res._id';

        // Socket local object instance contains user ids corresponding to socket ids
        sockets[socket_id] = { user_id };
        // User local object instance contains socket ids corresponding to user ids and sorties
        users[user_id] = { socket_id, sorties: [] };

        callback(null, 'authorised');
      });

      /** *** on Disconnect event delete the current user socket id from user's object and delete the user's key/Value pair from the socket object *****/
      socket.on('disconnect', function() {
        if (sockets[socket_id]) {
          delete users[sockets[socket_id].user_id];
          delete sockets[socket_id];
          socket.disconnect('disconnected');
        } else {
          socket.disconnect('unauthorized');
        }
      });
    });

    // event handler which will happen in other part of the app

    // eventEmitter.on('someevent', function(data) {
    //     // Data Handler
    // });

    next();
  }
};

Socket.register.attributes = {
  name: 'sortie-socket-connection'
};

export default Socket;
