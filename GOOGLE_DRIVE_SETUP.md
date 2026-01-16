# 📁 Google Drive PDF Hosting Setup Guide

## 🎯 Overview

যেহেতু Firebase Storage FREE plan এ কাজ করে না, আমরা Google Drive ব্যবহার করবো PDFs host করতে। 
এটা **100% FREE** এবং 15GB পর্যন্ত storage পাওয়া যায়!

---

## 📋 Step 1: Create Google Drive Folder Structure

### Main Folder: `ProstutiAcademy_Resources`

```
ProstutiAcademy_Resources/
│
├── 📁 HS_Arts/
│   ├── 📁 Semester_1/
│   │   ├── 📁 Bengali/
│   │   │   ├── 📁 Questions/
│   │   │   └── 📁 PYQ/
│   │   ├── 📁 English/
│   │   ├── 📁 History/
│   │   ├── 📁 Geography/
│   │   ├── 📁 Philosophy/
│   │   ├── 📁 Political_Science/
│   │   ├── 📁 Education/
│   │   └── 📁 Sanskrit/
│   │
│   ├── 📁 Semester_2/ (Same structure)
│   ├── 📁 Semester_3/ (Same structure)
│   └── 📁 Semester_4/ (Same structure)
│
└── 📁 Common_Resources/
    ├── 📁 Syllabus/
    ├── 📁 Exam_Routine/
    └── 📁 Study_Tips/
```

---

## 📋 Step 2: Share Folders Publicly

### Each folder এর জন্য:

1. Folder এ Right-click করো
2. **Share** → **Get link** click করো
3. **General access** → **Anyone with the link** select করো
4. Role: **Viewer** রাখো
5. **Copy link** করো

### Example Link:
```
https://drive.google.com/drive/folders/1ABC123xyz...
```

---

## 📋 Step 3: Get Folder IDs

Share link থেকে Folder ID extract করো:

```
Link: https://drive.google.com/drive/folders/1TJ6kJL0IVxm3Z0icJS4l7KROQ--x32kc
                                          ↑____________________________________↑
                                                    This is Folder ID
```

---

## 📋 Step 4: Update Environment Variables

`.env.local` file এ add করো:

```env
# Google Drive Main Folder ID
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=1TJ6kJL0IVxm3Z0icJS4l7KROQ--x32kc
```

---

## 📋 Step 5: Upload PDFs

### Each PDF এর জন্য:

1. Appropriate folder এ PDF upload করো
2. PDF এ Right-click → **Share** → **Get link**
3. **Anyone with the link** select করো
4. Link copy করো

### Example:
```
https://drive.google.com/file/d/1ABC123xyz.../view
```

---

## 📋 Step 6: Add PDF to App

### `src/data/driveResources.ts` এ add করো:

```typescript
{
  id: 'unique-id',
  fileId: '1ABC123xyz...', // ← Extract from share link
  title: 'Bengali Question Bank',
  titleBn: 'বাংলা প্রশ্ন ব্যাংক',
  description: 'Complete question bank',
  subjectId: 'bengali',
  semester: 4,
  type: 'question', // or 'pyq', 'notes', etc.
  year: 2023, // For PYQ only
  tags: ['সাহিত্য', 'ব্যাকরণ'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
```

---

## 📋 Step 7: Use in Component

```tsx
import { DrivePDFViewer, DrivePDFCard } from '@/components/resources';
import { getResourcesBySubject } from '@/data/driveResources';

// Get resources
const resources = getResourcesBySubject('bengali');

// Display viewer
<DrivePDFViewer resource={resources[0]} />

// Display card
<DrivePDFCard resource={resources[0]} onClick={() => {}} />
```

---

## 🔗 URL Helpers

```typescript
import { 
  getDriveEmbedUrl,    // For iframe embed
  getDriveDownloadUrl, // For download
  getDriveViewUrl,     // For full view
  extractFileId,       // Extract ID from link
} from '@/lib/drive/googleDrive';

// Examples:
getDriveEmbedUrl('1ABC123xyz')     // → https://drive.google.com/file/d/1ABC123xyz/preview
getDriveDownloadUrl('1ABC123xyz')  // → https://drive.google.com/uc?export=download&id=1ABC123xyz
getDriveViewUrl('1ABC123xyz')      // → https://drive.google.com/file/d/1ABC123xyz/view
```

---

## ✅ Checklist

- [ ] Main folder created: `ProstutiAcademy_Resources`
- [ ] Subject folders created (8 subjects × 4 semesters)
- [ ] All folders shared as public (Anyone with link)
- [ ] `.env.local` updated with folder ID
- [ ] PDFs uploaded and shared
- [ ] `driveResources.ts` updated with fileIds
- [ ] Tested in browser

---

## 🎉 Done!

এখন তোমার PDFs Google Drive থেকে serve হবে - **100% FREE!**
