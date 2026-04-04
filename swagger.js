const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'FitTrack API',
    description: 'API for tracking workouts and exercises'
  },
  host: 'localhost:8080', // add render URL later
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);