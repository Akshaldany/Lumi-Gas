import { createClient } from '@supabase/supabase-js';

// Using the keys provided in the initial prompt for direct frontend access
const supabaseUrl = 'https://qfvxevsvwcoptzpwinbe.supabase.co';
const supabaseAnonKey = 'sb_publishable_hNfDL17PU2piS3N42bKd7A_Pb19xCW1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
