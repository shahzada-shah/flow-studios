/**
 * Supabase Client Configuration
 *
 * NOTE: This app uses hard-coded data and does not require Supabase.
 * The client is created with dummy values to satisfy imports but is not used.
 */

import { createClient } from '@supabase/supabase-js'

// Use dummy values since we're using hard-coded data
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU0MzI5MDAsImV4cCI6MTk2MDk5MjkwMH0.placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
