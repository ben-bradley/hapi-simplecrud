var should = require('should'),
  Collection = require('../lib/Collection'),
  Element = require('../lib/Element');

describe('Collection', function () {

  var collection,
    path = '/things',
    data = {
      id: 'foo',
      name: 'bar'
    };

  beforeEach(function () {
    collection = new Collection(path);
  });

  afterEach(function () {
    collection = null;
  });


  describe('Properties', function () {

    it('should have 2 keys', function () {
      (Object.keys(collection).length).should.equal(2);
    });

    describe('.path', function () {

      it('should be a String', function () {
        (collection.path).should.be.a.String;
      });

      it('should equal the provided path', function () {
        (collection.path).should.equal(path);
      });

    }); // End .path

    describe('.collection', function () {

      it('should be an Array', function () {
        (collection.collection).should.be.an.Array;
      });

      it('should be empty', function () {
        (collection.collection.length).should.equal(0);
      });

    }); // End .collection

  }); // End properties


  describe('Methods', function () {

    describe('create()', function () {

      it('should exist', function () {
        (collection.create).should.exist;
      });

      it('should be a function', function () {
        (collection.create).should.be.a.Function;
      });

      it('should return a Promise', function () {
        (collection.create()).should.be.a.Promise;
      });

      it('should resolve an Element', function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_element) {
            (_element).should.be.an.instanceOf(Element);
            (_element.id).should.equal(data.id); // make sure the element ID is assigned
            (_element.public).should.be.an.Object; // make sure the public exists
            (_element.public.name).should.equal(data.name); // check a public property
            (collection.collection.length).should.equal(1);
            done();
          });
      });

      it('should reject when no paylod is provided', function (done) {
        collection
          .create() // no payload provided
          .catch(function (err) {
            (err).should.be.a.String;
            return new Error(err);
          })
          .done(function (_data) {
            (_data).should.be.an.Error;
            done();
          });
      });

      it('should reject when duplicate ID is provided', function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_data) {
            collection
              .create(data)
              .catch(function (err) {
                (err).should.be.a.String;
                return new Error(err);
              })
              .done(function (__data) {
                (__data).should.be.an.Error;
                done();
              });
          });
      });

    }); // End .create()

    describe('read()', function () {

      beforeEach(function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_element) {
            done();
          });
      });

      it('should exist', function () {
        (collection.read).should.exist;
      });

      it('should be a function', function () {
        (collection.read).should.be.a.Function;
      });

      it('should return a Promise', function () {
        (collection.read()).should.be.a.Promise;
      });

      it('should resolve an Array of Elements when no query is provided', function (done) {
        collection
          .read()
          .catch(done)
          .done(function (_elements) {
            (_elements).should.be.an.Array;
            (_elements.length).should.equal(1);
            (_elements[0]).should.be.an.instanceOf(Element);
            done();
          });
      });

      it('should resolve an Element when a valid query object is provided', function (done) {
        collection
          .read({
            id: data.id
          })
          .catch(done)
          .done(function (_element) {
            (_element).should.be.an.instanceOf(Element);
            done();
          });
      });

      it('should resolve an Element when a valid query string is provided', function (done) {
        collection
          .read(data.id)
          .catch(done)
          .done(function (_element) {
            (_element).should.be.an.instanceOf(Element);
            done();
          });
      });

      it('should resolve an undefined when an invalid query is provided', function (done) {
        collection
          .read('invalid')
          .catch(done)
          .done(function (_data) {
            (_data === undefined).should.equal(true, 'unexpected data returned from .read()');
            done();
          });
      });

      it('should reject when an invalid query is provided', function (done) {
        collection
          .read(['fail'])
          .catch(function (err) {
            (err).should.be.a.String;
            return new Error(err);
          })
          .done(function (_data) {
            (_data).should.be.an.Error;
            done();
          });
      });

    }); // End .read()

    describe('update()', function () {

      beforeEach(function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_element) {
            done();
          });
      });

      it('should exist', function () {
        (collection.update).should.exist;
      });

      it('should be a function', function () {
        (collection.update).should.be.a.Function;
      });

      it('should return a Promise', function () {
        (collection.update()).should.be.a.Promise;
      });

      it('should update a public property of an Element in the collection', function (done) {
        collection
          .update(data.id, {
            name: 'baz'
          })
          .catch(done)
          .done(function (_element) {
            (_element).should.be.an.instanceOf(Element);
            (_element.public.name).should.equal('baz');
            done();
          });
      });

      it('should NOT update the .id', function (done) {
        collection
          .update(data.id, {
            id: 'baz'
          })
          .catch(done)
          .done(function (_element) {
            (_element).should.be.an.instanceOf(Element);
            (_element.public.id).should.equal(data.id);
            done();
          });
      });

      it('should reject without a valid id', function (done) {
        collection
          .update(['invalid'], {
            name: 'baz'
          })
          .catch(function (err) {
            (err).should.be.a.String;
            return new Error(err);
          })
          .done(function (_data) {
            (_data).should.be.an.Error;
            done();
          });
      });

    }); // End .update()

    describe('delete()', function () {

      beforeEach(function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_element) {
            done();
          });
      });

      it('should exist', function () {
        (collection.delete).should.exist;
      });

      it('should be a function', function () {
        (collection.delete).should.be.a.Function;
      });

      it('should return a Promise', function () {
        (collection.delete()).should.be.a.Promise;
      });

      it('should delete an element from the collection', function (done) {
        collection
          .delete(data.id)
          .catch(done)
          .done(function (_data) {
            (_data).should.be.an.Object;
            (_data.deleted).should.equal(1);
            (collection.collection.length).should.equal(0);
            done();
          });
      });

      it('should reject an invalid id', function (done) {
        collection
          .delete(['invalid'])
          .catch(function (err) {
            (err).should.be.a.String;
            return new Error(err);
          })
          .done(function (_data) {
            (_data).should.be.an.Error;
            done();
          });
      });

    }); // End delete()

    describe('toJSON()', function () {

      beforeEach(function (done) {
        collection
          .create(data)
          .catch(done)
          .done(function (_element) {
            done();
          });
      });

      it('should exist', function () {
        (collection.toJSON).should.exist;
      });

      it('should be a function', function () {
        (collection.toJSON).should.be.a.Function;
      });

      it('should produce the .public property of the elements', function (done) {
        var _collection = collection.toJSON();
        (_collection).should.be.an.Array;
        (_collection.length).should.equal(1);
        (_collection[0]).should.be.an.Object;
        (_collection[0].id).should.equal(data.id);
        (_collection[0].name).should.equal(data.name);
        done();
      });

    }); // End .toJSON()

  }); // End methods

});
