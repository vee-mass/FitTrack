const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'FitTrack API',
    description: 'API for tracking workouts and exercises'
  },
  host: 'fittrack-jmso.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);