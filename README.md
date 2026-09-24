# Rafly Recruitment Prototype

Fallback deployment build for the recruitment prototype based on the stakeholder PDF.

## Features
- Public guest application form
- Active-job dropdown from Supabase PostgreSQL
- PDF-only CV upload (max 5 MB) to private Supabase Storage
- HR login via Supabase Auth + `hr_profiles`
- Applicant list, CV signed access, portfolio link, status updates
- Job creation and active/inactive toggle

## Required environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Never commit real secrets. Configure them in the hosting provider dashboard.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Import this repo into Netlify and add the three environment variables above before the production deploy.
