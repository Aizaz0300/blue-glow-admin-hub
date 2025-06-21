import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, PATIENTS_COLLECTION_ID } from '@/lib/appwrite';
import { UserModel } from '@/types/models';

export const usePatients = () => {
  const [patients, setPatients] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID
      );
      setPatients(response.documents.map((document: any) => document as UserModel));
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error };
};
