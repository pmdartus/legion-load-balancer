'use strict';

var http = require('http');
var httpProxy = require('http-proxy');

var config = require('../../config/configuration');

// Add all servers to load balance
var addresses = config.workers.map(function(workerUrl) {
  return {
    host: workerUrl,
    port: 80
  };
});

var proxyServer;

if (addresses.length) {
  // Simple round-robin load balancer
  proxyServer = httpProxy.createServer(function (req, res, proxy) {

    // Get the next target server
    var target = addresses.shift();
    req.headers.host = target.host;
    console.log('balancing request to: ', target.host);

    // Proxy the request
    proxy.proxyRequest(req, res, target);

    // Add the last server at the end of the array
    addresses.push(target);
  });

} else {
  // Bad gateway server
  proxyServer = http.createServer(function (req, res) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.write('Legion has nothing to fight with. Please set the ENV variable WORKERS with all the created workers.');
    res.end();
  });
}

module.exports = proxyServer;