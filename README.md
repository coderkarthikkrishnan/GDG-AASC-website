# GDG AASC — Firebase Realtime React App

This app shows events from Firebase Firestore in realtime and lets you create/update them from a simple UI.

## Features

- Realtime list from Firestore using onSnapshot
- Create and edit pages for events
- Minimal styling, works with Vite + React 19

## Setup

1. Create a Firebase project and enable Firestore (in Native mode).
1. Get your web app config from Firebase console and add a `.env.local` file in the project root:

```properties
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
```

1. Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Open the printed localhost URL.

## Usage

- Home page shows the realtime Events list.
- Click "New" to create a new event.
- Click "Edit" on any row to update it.
- Optional: Visit "/seed" to insert two sample events.

## Notes

- Firestore security rules should be configured for your needs. For local testing, you can allow read/write while developing and lock down later.
- If you deploy with Vite, ensure the env vars are set in your hosting provider.
