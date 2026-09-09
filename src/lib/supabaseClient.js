import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance;
if (supabaseUrl && supabaseKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseKey)
} else {
  console.warn('[AI Studio] Supabase not configured — using mock');
  // Very basic mock for supabase
  const store = {};
  
  const mockTable = (tableName) => {
    if (!store[tableName]) store[tableName] = [];
    
    return {
      select: async () => ({ data: store[tableName], error: null }),
      insert: async (rows) => {
        const added = rows.map(r => ({ ...r, id: Math.random().toString(36).substr(2, 9) }));
        store[tableName] = [...store[tableName], ...added];
        return { data: added, error: null };
      },
      update: async (rows) => ({ data: rows, error: null }),
      delete: async () => ({ data: [], error: null })
    };
  };

  supabaseInstance = {
    from: (tableName) => mockTable(tableName)
  };
}

export const supabase = supabaseInstance;
