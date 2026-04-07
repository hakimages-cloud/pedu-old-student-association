# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Project name: `pedu-old-student-association`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Click "Save"

## 3. Set up Realtime Database

1. Go to "Realtime Database" in Firebase Console
2. Click "Create Database"
3. Choose "Start in test mode" (allows read/write access)
4. Select a location (choose closest to your users)
5. Click "Enable"

## 4. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Under "Your apps", click the web app (</>) icon
3. Copy the Firebase configuration object
4. Replace the demo config in `src/services/firebase.js`

## 5. Update Firebase Configuration

Replace the demo config in `src/services/firebase.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 6. Deploy to Netlify

1. Add Firebase config to Netlify environment variables:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - etc.

2. Trigger new deployment

## Features Enabled

- Real-time user authentication
- Shared member database
- Persistent data storage
- Real-time updates across devices
- Admin member management
- Automatic membership numbers

## Security Note

For production, update your Firebase Realtime Database rules to secure your data.
