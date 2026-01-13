# API Key Management for CaterCare Ultimate

## Current API Key
- **Key Name**: VITE_GEMINI_API_KEY / GEMINI_API_KEY
- **Source**: Google AI Studio
- **Account**: foodexpert143@gmail.com

## Configuration Locations
The API key is read from these sources (in order of priority):
1. `process.env.GEMINI_API_KEY`
2. `process.env.VITE_GEMINI_API_KEY`

## Vite Config
The `vite.config.ts` automatically checks both environment variable names.

## How to Regenerate API Key
1. Go to https://aistudio.google.com/apikey
2. Sign in with foodexpert143@gmail.com
3. Create a new API key or rotate existing one
4. Update `.env.local` with the new key:
   ```
   VITE_GEMINI_API_KEY=your_new_key_here
   ```
5. Restart the dev server

## Permission Note
Ashis has granted full permission for API key management:
- Access to Google account for key generation
- Permission to regenerate keys before expiration
- Full access to manage `.env.local` configuration

---
*Last updated: 2026-01-11*
