const request = require('supertest');
const app = require('./server');
const mongodb = require('./db/connect');

describe('Unit Tests', () => {
  // 1. WAIT for DB before running tests
  beforeAll((done) => {
    mongodb.initDb((err) => {
      if (err) return done(err);
      done();
    });
  });

  // 2. CLOSE DB after tests finish to prevent "worker failed to exit"
  afterAll(async () => {
    const db = mongodb.getDb();
    if (db) {
      // client.close() is required for MongoClient
      await db.close();
    }
  });

  test('GET /programs should return 200', async () => {
    const res = await request(app).get('/programs');
    expect(res.statusCode).toBe(200);
  });

  test('POST /programs should return 401 if not logged in', async () => {
    const res = await request(app).post('/programs').send({
      programName: "Test Program"
    });
    expect(res.statusCode).toBe(401); 
  });

  test('GET /programs/:id with invalid ID should return 404 or 500', async () => {
    // Using a valid-length but non-existent ID
    const res = await request(app).get('/programs/645156a646c078972e6b9999');
    expect([404, 500]).toContain(res.statusCode);
  });
});