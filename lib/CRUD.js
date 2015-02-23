var Routes = require('./Routes'),
  Collection = require('./Collection');

function CRUD(path) {
  var collection = new Collection(path);

  var routes = new Routes(path, collection);

  return {
    collection: collection,
    routes: routes,
    path: path
  }
}

module.exports = CRUD;
