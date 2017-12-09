var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'embeddedmapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/embeddedmapp-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'embeddedmapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/embeddedmapp-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'embeddedmapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/embeddedmapp-production'
  }
};

module.exports = config[env];
