# 🚀 Firebase Deployment Guide - ProstutiAcademy

---

## 📋 Pre-Deployment Checklist

### ✅ Firebase Configuration (DONE)
- [x] `firebase.json` - Hosting config
- [x] `.firebaserc` - Project alias
- [x] `firestore.rules` - Security rules
- [x] `storage.rules` - Storage rules
- [x] `firestore.indexes.json` - Indexes
- [x] `next.config.ts` - Production optimized

### ⚠️ Build Issues to Fix
The production build has some export mismatches in:
- `src/hooks/index.ts` - Some hooks use `export default` but are imported as named exports
- `src/components/leaderboard/index.ts` - Missing `LeaderboardTable` export

---

## 🔧 Quick Fix for Build Issues

### Step 1: Fix Missing Exports
Check each file that has build errors and ensure exports match:

```typescript
// If a file has: export default function useExample() {}
// Export it as: export { default as useExample } from './useExample';

// If a file has: export function useExample() {}
// Export it as: export { useExample } from './useExample';
```

### Step 2: Run Build
```bash
npm run build
```

### Step 3: If build succeeds, deploy
```bash
firebase deploy --only hosting
```

---

## 🚀 Deployment Commands

### Install Firebase CLI (if not installed)
```bash
npm install -g firebase-tools
```

### Login to Firebase
```bash
firebase login
```

### Initialize Firebase (already done)
```bash
firebase init hosting
```

### Deploy to Firebase Hosting
```bash
# Deploy everything (hosting + rules)
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# Deploy only Storage rules
firebase deploy --only storage
```

---

## 📁 Project Structure for Firebase

```
prostuti-academy/
├── firebase.json           ← Hosting config
├── .firebaserc             ← Project alias
├── firestore.rules         ← Firestore security
├── firestore.indexes.json  ← Firestore indexes
├── storage.rules           ← Storage security
├── next.config.ts          ← Next.js config
└── .env.local              ← Environment variables
```

---

## 🔐 Environment Variables for Production

Create a `.env.production` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXDt39t8CEUdGPmZqGo5JsGYHzTGNWcbA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prostutiacademy-53a75.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prostutiacademy-53a75
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prostutiacademy-53a75.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1076487508806
NEXT_PUBLIC_FIREBASE_APP_ID=1:1076487508806:web:5481d3b8469e66e9d14b47
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-GM5GK6MS53
NEXT_PUBLIC_APP_NAME=ProstutiAcademy
NEXT_PUBLIC_SITE_URL=https://prostutiacademy.web.app
```

---

## 🌐 Post-Deployment

### Verify Deployment
1. Visit https://prostutiacademy.web.app
2. Test authentication
3. Test navigation
4. Check PWA installation

### Monitor
1. Firebase Console → Hosting
2. Check Analytics
3. Monitor errors

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Deploy Fails
```bash
# Check Firebase login
firebase login --reauth

# Check project
firebase projects:list
firebase use prostutiacademy-53a75
```

### 404 Errors
Check `firebase.json` rewrites are configured correctly.

---

## ✅ Deployment Complete!

Your app will be live at:
- **https://prostutiacademy.web.app**
- **https://prostutiacademy-53a75.web.app**
