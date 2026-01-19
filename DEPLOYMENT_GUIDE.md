# 🚀 Deployment Guide - ProstutiAcademy

**Platform**: Vercel (Frontend/Edge) + Firebase (Database/Auth/Storage)

---

## 📋 Pre-Deployment Validation (Safety Rule)
Before deploying, you **MUST** verify the application locally to prevent breaking the live site.

### 1. Run Local Build
This checks for type errors and build issues.
```bash
npm run build
```
> **Success criteria**: You see `✓ Compiled successfully` and reasonable build stats.
> **Failure**: If you see red errors, **DO NOT DEPLOY**. Fix them first.

### 2. Verify Bengali Font
- Check that educational content is rendering in **Noto Sans Bengali**.

---

## � Vercel Login (First Time Only)
If you are deploying from your computer for the first time, you need to log in.

1.  **Run the login command**:
    ```bash
    npx vercel login
    ```
2.  **Select your login method**:
    -   Use your arrow keys to select **GitHub** (or whichever account you use for Vercel).
    -   Press **Enter**.
3.  **Browser Authentication**:
    -   A browser window will open.
    -   Click **"Verify"** or **"Login"** on the webpage.
4.  **Success**:
    -   The terminal will say `> Success!`.

---

---

---

## 🔑 Environment Variables (Required for Vercel)

You must add these manually on Vercel because `.env.local` is **ignored** by git for security.

### Step-by-Step Guide:
1.  **Go to Vercel**: Open your [Vercel Dashboard](https://vercel.com/dashboard).
2.  **Select Project**: Click on `prostuti-academy` (or whatever you named it).
3.  **Go to Settings**: Click the **"Settings"** tab at the top.
4.  **Open Environment Variables**: Click **"Environment Variables"** on the left menu.
5.  **Copy & Paste**: Add the following Key-Value pairs one by one (Copy values from your local `.env.local` file):

| Key (Variable Name) | Value (Example from your file) |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBX...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `prostutiacademy-53a75.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `prostutiacademy-53a75` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `prostutiacademy-53a75.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1076487508806` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1076487508806:web:5481d3b8469e66e9d14b47` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-GM5GK6MS53` |

6.  **Redeploy**:
    -   Go to the **"Deployments"** tab.
    -   Find the failed deployment (at the top).
    -   Click the **three dots (⋮)** button next to it.
    -   Select **"Redeploy"**.

---

## 🚀 How to Deploy

### Option 1: Automatic Deployment (Recommended)
If your project is connected to GitHub/GitLab and Vercel:

1.  **Commit your changes**:
    ```bash
    git add .
    git commit -m "Your descriptive message here"
    ```
2.  **Push to main**:
    ```bash
    git push origin main
    ```
3.  **Watch Vercel**:
    -   Go to your Vercel Dashboard.
    -   You should see a "Building" status.
    -   Wait for it to turn **Green (Active)**.

### Option 2: Manual Vercel Deployment (CLI)
If you are strictly using the command line:

1.  Run the Vercel deploy command:
    ```bash
    npx vercel --prod
    ```
2.  Follow the prompts (hit Enter to accept defaults).

---

## 🔥 Firebase Rules Deployment
Since you use Firebase for Database and Storage, you might sometimes need to update security rules. This is separate from the Vercel website deployment.

### Deploy Firestore/Storage Rules Only
```bash
# Deploy Firestore Rule Updates
npx firebase deploy --only firestore:rules

# Deploy Storage Rule Updates
npx firebase deploy --only storage
```

---

## 🆘 Troubleshooting

### "Build Failed" on Vercel
-   **Check Logs**: Look at the Vercel error logs.
-   **Common Cause**: A file import case mismatch (e.g., importing `Button` from `./button` on Windows works, but fails on Vercel's Linux).
-   **Fix**: Ensure all imports match the exact file name casing.

### "Permission Denied" in Admin Panel
-   This implies a Firebase Rule issue.
-   Run `npx firebase deploy --only firestore:rules` to ensure the latest security rules are live.
