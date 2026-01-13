/**
 * API CONFIGURATION SERVICE
 * Manages Gemini API key validation and configuration
 */

import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Get Gemini API key from environment (support both VITE_ prefix and direct)
export const getGeminiApiKey = (): string | null => {
  return process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || null;
};

// Validate API key format (basic check)
export const isValidApiKey = (key: string | null): boolean => {
  if (!key) return false;
  // Gemini API keys typically start with "AIza" and are ~39 characters
  return key.startsWith('AIza') && key.length >= 35;
};

// Get API key with validation
export const getValidatedApiKey = (): string | null => {
  const key = getGeminiApiKey();
  if (!isValidApiKey(key)) {
    console.warn('[API Config] API key appears invalid or missing.');
    return null;
  }
  return key;
};