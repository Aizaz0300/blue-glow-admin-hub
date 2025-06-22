import { Client, Account, Databases, Storage, Models } from 'appwrite';

const client = new Client();

const VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client
    .setEndpoint(VITE_APPWRITE_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and collection IDs
export const DATABASE_ID = '67e6393a0009ccfe982e';
export const PROVIDERS_COLLECTION_ID = '67ef8112001cf8d36011';
export const APPOINTMENTS_COLLECTION_ID = '682e3b710004cea34582';
export const PATIENTS_COLLECTION_ID = '67e63ee90033460e4b77';
export const SERVICES_COLLECTION_ID = '68569bff001484871741';

export const DOCUMENTS_BUCKET_ID = '67e8a81c001a021be2be';

export const getBucketUsage = async (bucketId: string): Promise<{ filesCount: number; totalStorage: number }> => {
  try {
    let allFiles: Models.File[] = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    // Pagination loop
    while (hasMore) {
      const response = await storage.listFiles(bucketId);
      allFiles = [...allFiles, ...response.files];
      offset += response.files.length;
      hasMore = response.files.length === limit;
    }

    const filesCount = allFiles.length;
    const totalStorage = allFiles.reduce((sum, file) => sum + (file.sizeOriginal || 0), 0);

    return { filesCount, totalStorage };
  } catch (err) {
    console.error('Failed to fetch bucket usage:', err);
    throw err;
  }
};

export default client;
