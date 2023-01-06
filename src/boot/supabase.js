import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = 'https://deufajweyduuythoshvr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldWZhandleWR1dXl0aG9zaHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1NzQwODAsImV4cCI6MTk4MTE1MDA4MH0.peD5J84kgJrYx9MlGmAqx48PI7rgjG_moAowUI7pKYc'
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log('init supabase:', supabase)
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
