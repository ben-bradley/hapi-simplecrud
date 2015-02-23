var Boom = require('boom');

function errorHandler(err) {
  return Boom.badRequest(err);
}

function getPublic(data) {
  if (Array.isArray(data))
    return data.map(function(element) {
      return element.public;
    });
  else
    return data.public;
}

function Routes(path, collection) {
  return [{
    method: 'post',
    path: path,
    config: {
      description: 'The basic create route for ' + path,
      handler: function (request, reply) {
        collection
          .create(request.payload)
          .then(getPublic)
          .catch(errorHandler)
          .done(reply);
      }
    }
  }, {
    method: 'get',
    path: path + '/{id*}',
    config: {
      description: 'The basic read route for ' + path,
      handler: function (request, reply) {
        collection
          .read(request.params.id)
          .then(getPublic)
          .catch(errorHandler)
          .done(reply);
      }
    }
  }, {
    method: 'put',
    path: path + '/{id}',
    config: {
      description: 'The basic update route for ' + path,
      handler: function (request, reply) {
        collection
          .update(request.params.id, request.payload)
          .then(getPublic)
          .catch(errorHandler)
          .done(reply);
      }
    }
  }, {
    method: 'delete',
    path: path + '/{id}',
    config: {
      description: 'The basic delete route for ' + path,
      handler: function (request, reply) {
        collection
          .delete(request.params.id)
          .catch(errorHandler)
          .done(reply);
      }
    }
  }];
}

module.exports = Routes;
