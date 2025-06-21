import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, PROVIDERS_COLLECTION_ID, APPOINTMENTS_COLLECTION_ID , PATIENTS_COLLECTION_ID, getBucketUsage, DOCUMENTS_BUCKET_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { ServiceProvider } from '@/types/models';
import { parseProviderData } from '@/utils/dataParser';

export const useAppwriteData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProviders: 0,
    totalPatients: 0,
    appointmentsToday: 0,
    pendingApprovals: 0,
  });
  const [pendingProviders, setPendingProviders] = useState<ServiceProvider[]>([]);
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const [bucketUsage, setBucketUsage] = useState<{
    filesCount: number;
    storage: number;
  }>({ filesCount: 0, storage: 0 });

  const fetchData = async () => {
    try {
      // Fetch all providers first
      const allProvidersResponse = await databases.listDocuments(
        DATABASE_ID,
        PROVIDERS_COLLECTION_ID
      );

      // Parse and set all providers
      const parsedProviders = allProvidersResponse.documents.map(provider => 
        parseProviderData(provider)
      );
      setAllProviders(parsedProviders);

      // Filter pending providers from all providers
      const pendingOnly = parsedProviders.filter(p => p.status === 'pending');
      setPendingProviders(pendingOnly);

      // Get today's appointments and patients
      const today = new Date().toISOString().split('T')[0];
      const [appointmentsResponse, patientsResponse] = await Promise.all([
        databases.listDocuments(
          DATABASE_ID,
          APPOINTMENTS_COLLECTION_ID,
          [Query.equal('date', today)]
        ),
        databases.listDocuments(
          DATABASE_ID,
          PATIENTS_COLLECTION_ID
        )
      ]);

      // Fetch bucket usage
      const usage = await getBucketUsage(DOCUMENTS_BUCKET_ID);

      setBucketUsage({
        filesCount: usage.filesCount || 0,
        storage: usage.totalStorage || 0
      });

      // Set stats using the parsed providers
      setStats({
        totalProviders: parsedProviders.length,
        totalPatients: patientsResponse.total,
        appointmentsToday: appointmentsResponse.total,
        pendingApprovals: pendingOnly.length,
      });

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Call fetchData when component mounts

  return {
    stats,
    pendingProviders,
    allProviders,
    loading,
    error,
    refreshData: fetchData,
    bucketUsage,
  };
};
