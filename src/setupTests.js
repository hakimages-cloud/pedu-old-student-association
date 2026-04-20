// Mock Supabase for tests
const mockSupabase = {
  auth: {
    getSession: jest.fn(() => Promise.resolve({
      data: { session: null },
      error: null
    })),
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } }
    })),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({ eq: jest.fn(() => ({ single: jest.fn() })) })),
    insert: jest.fn(),
    update: jest.fn(),
  })),
};

// Make supabase available globally
global.supabase = mockSupabase;
