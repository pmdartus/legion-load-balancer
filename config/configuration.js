'use strict';

/**
 * @file Defines the loadbalancer settings.
 */

// node_env can either be "development" or "production"
var node_env = process.env.NODE_ENV || "development";
var default_port = 8000;

// Extract the workers
var workers_url = [];
if(!process.env.WORKERS) {
  console.error("No workers specified, load-balancing won't works.");
} else {
  workers_url = process.env.WORKERS.split(';');
}

// Exports configuration
module.exports = {
  env: node_env,
  port: process.env.PORT || default_port,
  workers : workers_url
};