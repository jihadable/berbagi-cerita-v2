// indexedDB.js
import { openDB } from 'idb';
import Story from './data/stories';

// Inisialisasi Database
const dbPromise = openDB('berbagi-cerita-store', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('stories')) {
            db.createObjectStore('stories', { keyPath: 'id' });
        }
    },
});

export const IndexedDB = {
    async saveStories(stories) {
        const db = await dbPromise;
        const tx = db.transaction('stories', 'readwrite');
        const store = tx.objectStore('stories');
      
        for (const story of stories) {
            await store.put(story)
        }
      
        await tx.done;
    },
    
    async syncStories() {
        const stories = await Story.getAllStories()
        await this.saveStories(stories)
    },

    async saveStory(story) {
        const db = await dbPromise;
        await db.put('stories', story);
    },
    
    async getAllStories() {
        const db = await dbPromise;
        return db.getAll('stories');
    },
    
    async deleteStory(id) {
        const db = await dbPromise;
        await db.delete('stories', id);
    },

    async clearStories() {
        const db = await dbPromise;
        const tx = db.transaction('stories', 'readwrite');
        const store = tx.objectStore('stories');
        await store.clear();
        await tx.done;
    }
}