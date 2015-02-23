var _ = require('lodash'),
  uuid = require('uuid'),
  q = require('q');

var Promise = q.Promise;

function Element(element) {
  if (!element.id)
    element.id = uuid.v4();
  this.id = element.id;

  this.public = {};
  _.assign(this.public, element);

  return this;
}

Element.prototype.update = function (element) {
  var _this = this;
  return Promise(function (resolve, reject) {
    _.assign(_this.public, _.omit(element, 'id'));
    resolve(_this);
  });
}

Element.prototype.toJSON = function () {
  var _this = this;
  return Promise(function (resolve, reject) {
    resolve(_this.public)
  });
}

module.exports = Element;
