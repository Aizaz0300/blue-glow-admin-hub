import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, PROVIDERS_COLLECTION_ID } from '@/lib/appwrite';
import { ServiceProvider } from '@/types/models';
import { parseProviderData } from '@/utils/dataParser';

export const useServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROVIDERS_COLLECTION_ID
      );
      setProviders(response.documents.map(provider => parseProviderData(provider)));
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (providerId: string, status: 'approved' | 'rejected') => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        PROVIDERS_COLLECTION_ID,
        providerId,
        { status: status }
      );
      await fetchProviders(); // Refresh the list
      return true;
    } catch (err) {
      console.error(`Error updating provider status:`, err);
      setError(err instanceof Error ? err.message : 'Failed to update provider status');
      return false;
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    providers,
    loading,
    error,
    refreshProviders: fetchProviders,
    updateProviderStatus: handleStatusUpdate
  };
};
