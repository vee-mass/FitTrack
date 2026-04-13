require('dotenv').config(); // 1. THIS MUST BE LINE 1
const express = require('express');
const cors = require('cors'); 
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport'); 
const session = require('express-session'); 

// 2. ONLY require the passport config AFTER dotenv.config()
require('./config/passport'); 

const port = process.env.PORT || 8080;
const app = express();

app
  .use(session({
    secret: process.env.SESSION_SECRET || 'secret', 
    resave: false,
    saveUninitialized: true,
  })) 
  .use(passport.initialize()) 
  .use(passport.session()) 
  .use(cors()) 
  .use(express.json()) 
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  }
});

module.exports = app;