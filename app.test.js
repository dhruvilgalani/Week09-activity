const request = require('supertest');
const app = require('./app');

describe('App routes', () => {
  test('GET / returns the version text', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('App Version');
  });

  test('GET /health returns OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('BROKEN');
  });
});
