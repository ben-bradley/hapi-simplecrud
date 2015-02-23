# Simple CRUD for Hapi

I needed a quick way to CRUD data on a Hapi server so I write this to do it for me =)

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

## TODO

- Finish the readme!
- Add the Travis-CI bling
