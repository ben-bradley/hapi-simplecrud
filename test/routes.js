var should = require('should'),
  _ = require('lodash'),
  Routes = require('../lib/Routes'),
  Collection = require('../lib/Collection');

var assert = {
  error: function (result) {
    (result).should.be.an.Error;
    (result.output).should.be.an.Object;
    (result.output.payload).should.be.an.Object;
    (result.output.statusCode).should.equal(400);
  }
}

describe('Routes', function () {

  var path = '/things',
    data = {
      id: 'foo',
      name: 'bar'
    },
    collection,
    routes;

  beforeEach(function () {
    collection = new Collection(path);
    routes = new Routes(path, collection);
  });

  afterEach(function () {
    collection = null;
    routes = null;
  });

  describe('Create (POST)', function () {
    var route;

    beforeEach(function () {
      route = _.findWhere(routes, {
        method: 'post'
      });
    });

    afterEach(function () {
      route = null;
    });

    it('should be an object', function () {
      (route).should.be.an.Object;
      (route).should.have.properties(['method', 'path', 'config']);
    });

    it('should have the root path', function () {
      (route.path).should.equal(path);
    });

    it('should have a description', function () {
      (route.config.description).should.be.a.String;
    });

    it('should create and return a new element', function (done) {
      route.config.handler({
        payload: data
      }, function (result) {
        (result).should.be.an.Object;
        (result).should.eql(data);
        done();
      });
    });

    it('should create and return a new element even w/o an .id', function (done) {
      var uuid = /[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}/;
      route.config.handler({
        payload: {
          name: data.name
        }
      }, function (result) {
        (result).should.be.an.Object;
        (result.id.match(uuid) !== null).should.equal(true, 'auto-generated id not a UUID: ' + result.id);
        (result.name).should.eql(data.name);
        done();
      });
    });

    it('should return an error if invalid data is provided', function (done) {
      route.config.handler({}, function (result) {
        assert.error(result);
        done();
      });
    });

  }); // End Create (POST)

  describe('Read (GET)', function () {
    var route;

    beforeEach(function (done) {
      var create = _.findWhere(routes, {
        method: 'post'
      });
      create.config.handler({
        payload: data
      }, function () {
        done();
      });
      route = _.findWhere(routes, {
        method: 'get'
      });
    });

    afterEach(function () {
      route = null;
    });

    it('should be an object', function () {
      (route).should.be.an.Object;
      (route).should.have.properties(['method', 'path', 'config']);
    });

    it('should have the root path & optional id param', function () {
      (route.path).should.equal(path + '/{id*}');
    });

    it('should have a description', function () {
      (route.config.description).should.be.a.String;
    });

    it('should return a full array without an id param', function (done) {
      route.config.handler({
        params: {}
      }, function (result) {
        (result).should.be.an.Array;
        (result.length).should.equal(1);
        (result[0]).should.eql(data);
        done();
      });
    });

    it('should return a single element with an id param', function (done) {
      route.config.handler({
        params: {
          id: data.id
        }
      }, function (result) {
        (result).should.be.an.Object;
        (result).should.eql(data);
        done();
      });
    });

  }); // End Read (GET)

  describe('Update (PUT)', function () {
    var route;

    beforeEach(function (done) {
      var create = _.findWhere(routes, {
        method: 'post'
      });
      create.config.handler({
        payload: data
      }, function () {
        done();
      });
      route = _.findWhere(routes, {
        method: 'put'
      });
    });

    afterEach(function () {
      route = null;
    });

    it('should be an object', function () {
      (route).should.be.an.Object;
      (route).should.have.properties(['method', 'path', 'config']);
    });

    it('should have the root path & required id param', function () {
      (route.path).should.equal(path + '/{id}');
    });

    it('should have a description', function () {
      (route.config.description).should.be.a.String;
    });

    it('should return an error since no ID was provided', function (done) {
      route.config.handler({
        params: {}
      }, function (result) {
        assert.error(result);
        done();
      });
    });

    it('should return a single element with an id param', function (done) {
      route.config.handler({
        params: {
          id: data.id
        },
        payload: {
          name: 'baz'
        }
      }, function (result) {
        (result).should.be.an.Object;
        (result.id).should.eql(data.id);
        (result.name).should.equal('baz');
        done();
      });
    });

  }); // End Update (PUT)

  describe('Delete (DELETE)', function () {
    var route;

    beforeEach(function (done) {
      var create = _.findWhere(routes, {
        method: 'post'
      });
      create.config.handler({
        payload: data
      }, function () {
        done();
      });
      route = _.findWhere(routes, {
        method: 'delete'
      });
    });

    afterEach(function () {
      route = null;
    });

    it('should be an object', function () {
      (route).should.be.an.Object;
      (route).should.have.properties(['method', 'path', 'config']);
    });

    it('should have the root path & required id param', function () {
      (route.path).should.equal(path + '/{id}');
    });

    it('should have a description', function () {
      (route.config.description).should.be.a.String;
    });

    it('should return an error since no ID was provided', function (done) {
      route.config.handler({
        params: {}
      }, function (result) {
        assert.error(result);
        done();
      });
    });

    it('should return a { deleted: Number } object', function (done) {
      route.config.handler({
        params: {
          id: data.id
        }
      }, function (result) {
        (result).should.be.an.Object;
        (result.deleted).should.eql(1);
        done();
      });
    });

  }); // End Read (GET)

});
