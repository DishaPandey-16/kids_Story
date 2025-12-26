export const saveImageToIndexedDB = (id: string, base64Data: string) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    const request = indexedDB.open("StoryYetuImages", 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images");
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(["images"], "readwrite");
      const store = transaction.objectStore("images");
      const putRequest = store.put(base64Data, id);

      putRequest.onsuccess = () => resolve(true);
      putRequest.onerror = () => reject("Failed to save to IndexedDB");
    };

    request.onerror = () => reject("Failed to open IndexedDB");
  });
};

export const getImageFromIndexedDB = (id: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    const request = indexedDB.open("StoryYetuImages", 1);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(["images"], "readonly");
      const store = transaction.objectStore("images");
      const getRequest = store.get(id);

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => resolve(null);
    };

    request.onerror = () => resolve(null);
  });
};
