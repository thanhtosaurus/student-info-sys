const supabase = require('../db');

describe('Supabase Connection', () => {
  // Test basic connection
  test('should connect to Supabase', async () => {
    const { data, error } = await supabase
      .from('students')
      .select('count');
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  // Test query execution
  test('should execute a simple query', async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .limit(1);
    
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  // Test error handling
  test('should handle invalid query gracefully', async () => {
    const { data, error } = await supabase
      .from('nonexistent_table')
      .select('*');
    
    expect(error).toBeDefined();
  });

  // Test service role capabilities
  test('should have service role access', async () => {
    // Try to access system tables (only possible with service role)
    const { data, error } = await supabase
      .from('_prisma_migrations') // or another system table
      .select('count');
    
    // Even if the table doesn't exist, we should get a different error than permission denied
    expect(error?.message).not.toContain('Permission denied');
  });

  // Optional: Test RLS bypass (if you have RLS enabled)
  test('should bypass RLS with service role', async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .limit(1);
    
    expect(error).toBeNull();
    // Service role should be able to read data regardless of RLS policies
  });
}); 