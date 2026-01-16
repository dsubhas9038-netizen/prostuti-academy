// IndexedDB Storage Utility
// Provides offline data storage for questions, bookmarks, and progress

const DB_NAME = 'ProstutiAcademyDB';
const DB_VERSION = 1;

// Store names
export const STORES = {
    QUESTIONS: 'questions',
    BOOKMARKS: 'bookmarks',
    PROGRESS: 'progress',
    TESTS: 'tests',
    CACHE_META: 'cacheMeta',
};

// Initialize the database
export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
            reject(new Error('IndexedDB not supported'));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('[IndexedDB] Failed to open database:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            console.log('[IndexedDB] Database opened successfully');
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            console.log('[IndexedDB] Upgrading database...');
            const db = (event.target as IDBOpenDBRequest).result;

            // Questions store
            if (!db.objectStoreNames.contains(STORES.QUESTIONS)) {
                const questionsStore = db.createObjectStore(STORES.QUESTIONS, { keyPath: 'id' });
                questionsStore.createIndex('subjectId', 'subjectId', { unique: false });
                questionsStore.createIndex('chapterId', 'chapterId', { unique: false });
                questionsStore.createIndex('cachedAt', 'cachedAt', { unique: false });
            }

            // Bookmarks store
            if (!db.objectStoreNames.contains(STORES.BOOKMARKS)) {
                const bookmarksStore = db.createObjectStore(STORES.BOOKMARKS, { keyPath: 'questionId' });
                bookmarksStore.createIndex('subjectId', 'subjectId', { unique: false });
                bookmarksStore.createIndex('addedAt', 'addedAt', { unique: false });
            }

            // Progress store
            if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
                db.createObjectStore(STORES.PROGRESS, { keyPath: 'userId' });
            }

            // Tests store
            if (!db.objectStoreNames.contains(STORES.TESTS)) {
                const testsStore = db.createObjectStore(STORES.TESTS, { keyPath: 'id' });
                testsStore.createIndex('subjectId', 'subjectId', { unique: false });
                testsStore.createIndex('cachedAt', 'cachedAt', { unique: false });
            }

            // Cache metadata store
            if (!db.objectStoreNames.contains(STORES.CACHE_META)) {
                db.createObjectStore(STORES.CACHE_META, { keyPath: 'key' });
            }

            console.log('[IndexedDB] Database upgrade complete');
        };
    });
}

// Generic add/update item
export async function putItem<T extends { [key: string]: any }>(
    storeName: string,
    item: T
): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.put({
            ...item,
            cachedAt: new Date().toISOString(),
        });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// Generic get item by key
export async function getItem<T>(
    storeName: string,
    key: string | number
): Promise<T | null> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// Generic get all items
export async function getAllItems<T>(storeName: string): Promise<T[]> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// Get items by index
export async function getItemsByIndex<T>(
    storeName: string,
    indexName: string,
    value: string | number
): Promise<T[]> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const index = store.index(indexName);
        const request = index.getAll(value);

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// Delete item
export async function deleteItem(
    storeName: string,
    key: string | number
): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// Clear store
export async function clearStore(storeName: string): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => db.close();
    });
}

// ==========================================
// SPECIFIC HELPERS
// ==========================================

// Save questions for offline use
export async function cacheQuestions(questions: any[]): Promise<void> {
    for (const question of questions) {
        await putItem(STORES.QUESTIONS, question);
    }
    console.log(`[IndexedDB] Cached ${questions.length} questions`);
}

// Get cached questions by subject
export async function getCachedQuestionsBySubject(subjectId: string): Promise<any[]> {
    return getItemsByIndex(STORES.QUESTIONS, 'subjectId', subjectId);
}

// Get cached questions by chapter
export async function getCachedQuestionsByChapter(chapterId: string): Promise<any[]> {
    return getItemsByIndex(STORES.QUESTIONS, 'chapterId', chapterId);
}

// Save bookmarks for offline
export async function cacheBookmarks(bookmarks: any[]): Promise<void> {
    for (const bookmark of bookmarks) {
        await putItem(STORES.BOOKMARKS, bookmark);
    }
    console.log(`[IndexedDB] Cached ${bookmarks.length} bookmarks`);
}

// Get all cached bookmarks
export async function getCachedBookmarks(): Promise<any[]> {
    return getAllItems(STORES.BOOKMARKS);
}

// Save user progress
export async function cacheProgress(userId: string, progress: any): Promise<void> {
    await putItem(STORES.PROGRESS, { userId, ...progress });
    console.log('[IndexedDB] Progress cached');
}

// Get cached progress
export async function getCachedProgress(userId: string): Promise<any | null> {
    return getItem(STORES.PROGRESS, userId);
}

// Save test for offline use
export async function cacheTest(test: any): Promise<void> {
    await putItem(STORES.TESTS, test);
    console.log(`[IndexedDB] Test ${test.id} cached`);
}

// Get cached test
export async function getCachedTest(testId: string): Promise<any | null> {
    return getItem(STORES.TESTS, testId);
}

// Get all cached tests
export async function getCachedTests(): Promise<any[]> {
    return getAllItems(STORES.TESTS);
}

// ==========================================
// CACHE METADATA
// ==========================================

interface CacheMeta {
    key: string;
    lastSynced: string;
    count: number;
}

// Update cache metadata
export async function updateCacheMeta(key: string, count: number): Promise<void> {
    await putItem(STORES.CACHE_META, {
        key,
        lastSynced: new Date().toISOString(),
        count,
    });
}

// Get cache metadata
export async function getCacheMeta(key: string): Promise<CacheMeta | null> {
    return getItem(STORES.CACHE_META, key);
}

// Get storage usage
export async function getStorageEstimate(): Promise<{
    usage: number;
    quota: number;
    usagePercent: number;
}> {
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        const usage = estimate.usage || 0;
        const quota = estimate.quota || 0;
        return {
            usage,
            quota,
            usagePercent: quota > 0 ? Math.round((usage / quota) * 100) : 0,
        };
    }
    return { usage: 0, quota: 0, usagePercent: 0 };
}

// Format bytes to human readable
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default {
    openDatabase,
    putItem,
    getItem,
    getAllItems,
    getItemsByIndex,
    deleteItem,
    clearStore,
    cacheQuestions,
    getCachedQuestionsBySubject,
    getCachedQuestionsByChapter,
    cacheBookmarks,
    getCachedBookmarks,
    cacheProgress,
    getCachedProgress,
    cacheTest,
    getCachedTest,
    getCachedTests,
    updateCacheMeta,
    getCacheMeta,
    getStorageEstimate,
    formatBytes,
    STORES,
};
