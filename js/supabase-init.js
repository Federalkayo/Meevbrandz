// --- REAL SUPABASE CONNECTION ---
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://dcwmqnonfruqgrzaqbas.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjd21xbm9uZnJ1cWdyemFxYmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODc0NjAsImV4cCI6MjA4MDE2MzQ2MH0.vxHW-xZpbVuhjjaK66b5sOQkIHLamEB7KDE8j5eVFN8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
