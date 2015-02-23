module.exports.register = function (server, options, next) {

  var CRUD = require('./CRUD');

  if (!options.paths)
    next(new Error('No paths specified in SimpleCRUD options'));

  var paths = options.paths;

  if (typeof paths === 'string')
    paths = paths.split(',');
  else if (!Array.isArray(paths))
    next(new Error('SimpleCRUD expects a comma-delimited string or array of paths'));

  var _server = (options.select) ? server.select(options.select) : server;

  for (var p in paths) {
    var crud = new CRUD(paths[p]);
    _server.route(crud.routes);
  }

  next();
}

module.exports.register.attributes = {
  pkg: require('../package.json')
}
