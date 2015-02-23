var should = require('should'),
  CRUD = require('../lib/CRUD');

describe('Hapi Simple CRUD', function() {

  var crud, routes, collection, element;

  beforeEach(function() {
    crud = new CRUD('/things');
  });

  afterEach(function() {
    crud = null;
  });

  describe('Collection', function() {

    it('should exist', function() {
      (crud.collection).should.exist;
    });


  });

  describe('Routes', function() {

    it('should exist', function() {
      (crud.routes).should.exist;
    });

  });

});
