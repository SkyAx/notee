const express = require('express');
const consola = require('consola');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { Nuxt, Builder } = require('nuxt');
require('dotenv').config();

const app = express();

const dbUrl = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.bofno.mongodb.net/${process.env.DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(bodyParser.json());

  app.use(nuxt.render);

  // Give nuxt middleware to express
  app.use(compression());
  app.use(express.static(__dirname + '/public'));

  app.use(helmet());

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
