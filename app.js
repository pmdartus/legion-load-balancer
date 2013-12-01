'use strict';

var config = require('./config/configuration');
var server = require('./lib/load-balancer');

console.log('Legion is going to war, on port: ' + config.port);

module.exports = server.listen(config.port);