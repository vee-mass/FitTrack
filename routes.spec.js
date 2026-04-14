const request = require('supertest');
const app = require('./server');
const mongodb = require('./db/connect');

describe('Final Project Unit Tests', () => {
  // 1. SETUP: Wait for DB connection before starting
  beforeAll((done) => {
    mongodb.initDb((err) => {
      if (err) return done(err);
      done();
    });
  });

  // 2. TEARDOWN: This fix prevents the "worker process failed to exit" error
  afterAll(async () => {
    const client = mongodb.getDb();
    if (client) {
      await client.close(); // Correctly closes the MongoClient connection
    }
  });

  // --- Collection 1: Programs (The "Big" Collection) ---
  test('GET /programs should return 200', async () => {
    const res = await request(app).get('/programs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /programs should return 401 if not logged in', async () => {
    const res = await request(app).post('/programs').send({
      programName: "Auth Test"
    });
    expect(res.statusCode).toBe(401); 
  });

  // --- Collection 2: Workouts ---
  test('GET /workouts should return 200', async () => {
    const res = await request(app).get('/workouts');
    expect(res.statusCode).toBe(200);
  });

  // --- Collection 3: Exercises ---
  test('GET /exercises should return 200', async () => {
    const res = await request(app).get('/exercises');
    expect(res.statusCode).toBe(200);
  });

  // --- Collection 4: Users ---
  test('GET /users should return 200', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  });

  // --- Single Item Test ---
  test('GET /programs/:id with invalid ID should return 404 or 500', async () => {
    // This ID is the correct length for MongoDB but shouldn't exist
    const res = await request(app).get('/programs/645156a646c07654321abcde');
    expect([404, 500]).toContain(res.statusCode);
  });
});