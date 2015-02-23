var _ = require('lodash'),
  q = require('q'),
  Element = require('./Element');

var Promise = q.Promise;

function Collection(path) {
  this.collection = [];
  this.path = path;
  return this;
}

Collection.prototype.create = function (payload) {
  var _this = this;
  return Promise(function (resolve, reject) {
    if (!payload)
      return reject('No payload to create: ' + _this.path);
    var element = new Element(payload);
    if (_.findWhere(_this.collection, {
        id: element.id
      }))
      return reject('ID ' + element.id + ' exists in collection ' + _this.path);
    _this.collection.push(element);
    return resolve(element);
  });
}

Collection.prototype.read = function (query) {
  var _this = this;
  return Promise(function(resolve, reject) {
    if (_.isString(query))
      return resolve(_.findWhere(_this.collection, {
        id: query
      }));
    else if (_.isPlainObject(query))
      return resolve(_.findWhere(_this.collection, query));
    else if (!query)
      return resolve(_this.collection);
    else
      return reject('Invalid collection query: ' + query);
  });
}

Collection.prototype.update = function (id, element) {
  var _this = this;
  return Promise(function(resolve, reject) {
    if (!id)
      return reject('Cannot update:' + id);
    _this.read(id)
      .catch(reject)
      .done(function(_element) {
        if (!_element)
          return reject('Element not found: ', +id);
        _element.update(element)
          .catch(reject)
          .done(resolve);
      });

  })
}

Collection.prototype.delete = function (id) {
  var _this = this;
  return Promise(function(resolve, reject) {
    if (!id || !_.isString(id))
      return reject('Cannot delete: ' + id);
    var before = _this.collection.length;
    _this.collection = _.reject(_this.collection, {
      id: id
    });
    return resolve({ deleted: (before - _this.collection.length) });
  });
}

Collection.prototype.toJSON = function() {
  return _.map(this.collection, function(element) {
    return element.public;
  });
}

module.exports = Collection;
