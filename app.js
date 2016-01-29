'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

const helloPostHandler = function(request, reply) {
    //console.log("rawPayload: " + request.rawPayload);
    console.log("Received POST from " + request.payload.name + "; id=" + (request.payload.id || 'anon'));

    reply({
        greeting: 'POST hello to ' + request.payload.name
    });
};

// Add the route
server.route([
  {
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
      return reply('hello world');
    }
  },
  {
    method: 'POST',
    path: '/hello2',
    handler: helloPostHandler
  }
]);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
