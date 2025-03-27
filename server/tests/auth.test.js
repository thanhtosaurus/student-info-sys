const request = require('supertest');
const express = require('express');
const authRouter = require('../routes/auth');
const supabase = require('../db');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Routes', () => {
  // Test login route
  describe('POST /api/auth/login', () => {
    test('should login with valid credentials', async () => {
      const testUser = {
        email: 'thanhster@gmail.com',
        password: 'test'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(testUser)
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    test('should fail with invalid credentials', async () => {
      const invalidUser = {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidUser)
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('should fail with missing email', async () => {
      const missingEmail = {
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(missingEmail)
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });

    test('should fail with missing password', async () => {
      const missingPassword = {
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(missingPassword)
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });
  });
}); 