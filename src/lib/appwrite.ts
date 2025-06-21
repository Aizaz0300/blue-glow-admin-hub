import { Client, Databases, Account, Storage, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Set your Appwrite endpoint
    .setProject('67e637810004c83abb76');        // Set your project ID

export const databases = new Databases(client);
export const account = new Account(client);
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

export { client };
