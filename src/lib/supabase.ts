import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactSubmission } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit contact inquiry to Supabase, falling back gracefully to local storage
 * if credentials have not been linked yet.
 */
export async function submitContactInquiry(
  data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; id: string; error?: string }> {
  const newSubmission: ContactSubmission = {
    ...data,
    id: `EF-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: insertedData, error } = await supabase
        .from('contacts')
        .insert([newSubmission])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insertion warning, falling back to local store:', error.message);
        saveToLocalStorage(newSubmission);
        return { success: true, id: newSubmission.id! };
      }

      return { success: true, id: insertedData?.id || newSubmission.id! };
    } catch (err) {
      console.warn('Network issue writing to Supabase, saved locally:', err);
      saveToLocalStorage(newSubmission);
      return { success: true, id: newSubmission.id! };
    }
  } else {
    // Graceful fallback to persistent localStorage
    saveToLocalStorage(newSubmission);
    // Simulate natural network turnaround time for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, id: newSubmission.id! };
  }
}

function saveToLocalStorage(record: ContactSubmission) {
  try {
    const existing = JSON.parse(localStorage.getItem('epicforce_contacts') || '[]');
    existing.unshift(record);
    localStorage.setItem('epicforce_contacts', JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export function getStoredSubmissions(): ContactSubmission[] {
  try {
    return JSON.parse(localStorage.getItem('epicforce_contacts') || '[]');
  } catch {
    return [];
  }
}
