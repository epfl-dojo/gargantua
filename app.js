'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

const mongoUrl = "mongodb://localhost:27017/test";
const mongoCollection = "gargantua";
const mongo = require("./mongo.js")(mongoUrl, mongoCollection);

const pushPostHandler = function(request, reply) {
    console.log("Received POST : " + JSON.stringify(request.payload));
    mongo.insert(request.payload, function(){
        console.log("Stored with _id : " + request.payload._id);
        reply(request.payload);
    });
};

// Add the route
server.route([
    {
        method: 'GET',
        path:'/hello',
        handler: function (request, reply) {
            return reply({answer: 'hello world'});
        }
    },
    {
        method: 'POST',
        path: '/push',
        handler: pushPostHandler
    }
]);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
