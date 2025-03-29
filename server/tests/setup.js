require('dotenv').config({ path: './tests/.env.test' });

// Global test setup
beforeAll(async () => {
  // Add any setup code here
  console.log('Starting tests...');
});

// Global test teardown
afterAll(async () => {
  // Add any cleanup code here
  console.log('Finished tests.');
}); 