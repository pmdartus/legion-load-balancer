'use strict';

var request = require('supertest');
require('should');

describe('No load-balancing if not specified workers', function () {
  // Force to have no initial workers
  process.env.WORKERS = '';
  var app = require('../lib/load-balancer');

  it('should return a bad gateway', function (done) {
    request(app).get('/')
      .expect(502)
      .end(done);
  });
});