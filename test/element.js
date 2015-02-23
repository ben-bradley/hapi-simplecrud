var should = require('should'),
  Element = require('../lib/Element');

describe('Element', function () {

  var element,
    data = {
      id: 'foo',
      name: 'bar'
    };

  beforeEach(function () {
    element = new Element({
      id: 'foo',
      name: 'bar'
    });
  });

  afterEach(function () {
    element = null;
  });


  describe('Properties', function () {

    it('should have 2 keys', function () {
      (Object.keys(element).length).should.equal(2);
    });

    describe('.id', function () {

      it('should be a String', function () {
        (element.id).should.be.a.String;
      });

      it('should be a UUID if .id isn\'t provided', function() {
        var _element = new Element({ name: 'bar' }),
          uuid = /[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}/;
        (_element.id).should.be.a.String;
        (_element.id.match(uuid) !== null).should.equal(true, 'auto-generated id not a UUID: '+_element.id);
      });

    }); // End .id

    describe('.public', function () {

      it('should be an Object', function () {
        (element.public).should.be.an.Object;
      });

      it('should have the .id value', function () {
        (element.public.id).should.equal(element.id);
      });

      it('should have "' + data.name + '" in .name', function () {
        (element.public.name).should.equal(data.name);
      });

    }); // End .public

  }); // End properties


  describe('Methods', function () {

    describe('update()', function () {

      it('should exist', function () {
        (element.update).should.exist;
      });

      it('should be a function', function () {
        (element.update).should.be.a.Function;
      });

      it('should return a Promise', function () {
        (element.update()).should.be.a.Promise;
      });

      it('should update a public property on the element', function (done) {
        element.update({
          name: 'baz'
        })
          .catch(done)
          .done(function (_element) {
            (_element.public.name).should.equal('baz');
            done();
          });
      });

      it('should NOT update the .id', function (done) {
        element.update({
          id: 'blargh'
        })
          .catch(done)
          .done(function (_element) {
            (_element.public.id).should.not.equal('blargh');
            (_element.id).should.not.equal('blargh');
            done();
          });
      });

    }); // End .update()

    describe('toJSON()', function() {

      it('should exist', function() {
        (element.toJSON).should.exist;
      });

      it('should be a function', function() {
        (element.toJSON).should.be.a.Function;
      });

      it('should return a Promise', function() {
        (element.toJSON()).should.be.a.Promise;
      });

      it('should produce the .public property', function(done) {
        element.toJSON()
          .catch(done)
          .done(function(_data) {
            (_data.id).should.equal(data.id);
            (_data.name).should.equal(data.name);
            done();
          });
      });

    }); // End .toJSON()

  }); // End methods

});
