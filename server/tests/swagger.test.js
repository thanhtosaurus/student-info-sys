const request = require('supertest');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger');

// Create test app
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

describe('Swagger Documentation', () => {
  // Test if Swagger UI is accessible
  test('should serve Swagger UI', async () => {
    const response = await request(app)
      .get('/api-docs/')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toContain('swagger');
  });

  // Test Swagger specification content
  test('should have correct API specifications', () => {
    expect(specs.openapi).toBe('3.0.0');
    expect(specs.info).toEqual({
      title: 'Student Information System API',
      version: '1.0.0',
      description: 'API documentation for Student Information System',
    });
  });

  // Test if authentication endpoints are documented
  test('should have authentication endpoints documented', () => {
    const paths = specs.paths;
    expect(paths['/api/auth/login']).toBeDefined();
    expect(paths['/api/auth/login'].post).toBeDefined();
  });

  // Test server configurations
  test('should have correct server configurations', () => {
    expect(specs.servers).toEqual([
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ]);
  });
}); 