# Simple CRUD for Hapi [![Build Status](https://api.travis-ci.org/ben-bradley/haip-simplecrud.png)](http://travis-ci.org/ben-bradley/hapi-simplecrud)

> Create, Read, Update, and Delete

I needed a quick way to CRUD data on a Hapi server so I write this to do it for me.

Plus, it's fun to use "crud" as a technical term in front of a room full of professionals =)

## Install

```
npm install ben-bradley/hapi-simplecrud
```

## Use

```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: 3000
});

/**
 * These paths become available on your server using the standard HTTP calls:
 * - Create (GET /things/{id*})
 * - Read (POST /things)
 * - Update (PUT /things/{id})
 * - Delete (DELETE /things/{id})
 */
var paths = [ '/things', '/thangs' ];

server.register({
  register: require('hapi-simplecrud'),
  options: {
    paths: paths
  }
}, function(err) {
  if (err)
    throw new Error(err);
  console.log('Loaded Simple CRUD routes: ', paths);
});

server.start();
```

## Concepts

The basic ideas this is built on draw heavily on Backbone's view of the world.

The general use-case for this plugin is to quickly mock out data for testing and development.  At initialization, there is no actual data stored in the server and it has no built-in access to any data storage framework.  All the data that the server deals with is stored in memory!

This means that if you want to use it, you'll need to populate data into the server after it spins up via standard HTTP calls that I'll talk more about below.

Once you've POSTed your data to the server (create), you can then GET (read), PUT (update), and DELETE (... delete) it using standard URL route patterns.

## Components

There are three basic components: 1) Elements, 2) Collections, and 3) Routes

### Elements

- The __Element__ is the most basic component.
- It's a singluar data element.
- It should be a noun:
  - cat
  - rhinoserous
  - thing

### Collections

- It's an array of __Element__s
- It should be a plural noun:
  - cats
  - rhinoseroususues
  - things

## Routes

- Create (POST)

```
curl -X POST -H 'Content-Type: application/json' -d '{"id":"foo","name":"bar"}' localhost:3000/things
```

- Read (GET)

```
curl localhost:3000/things
curl localhost:3000/things/foo
```

- Update (PUT)

```
curl -X PUT -H 'Content-Type: application/json' -d '{"name":"rab"}' localhost:3000/things/foo
```

- Delete (DELETE)

```
curl -X DELETE localhost:3000/things/foo
```

## TODO

- Finish the readme!
- Add the Travis-CI bling
