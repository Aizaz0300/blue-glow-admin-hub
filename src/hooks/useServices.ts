import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, SERVICES_COLLECTION_ID } from '@/lib/appwrite';
import { Service } from '@/types/models';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        SERVICES_COLLECTION_ID
      );
      setServices(response.documents.map((doc: any) => doc as Service));
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: Omit<Service, '$id'>) => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        SERVICES_COLLECTION_ID,
        'unique()',
        serviceData
      );
      await fetchServices();
      return true;
    } catch (err) {
      console.error('Error adding service:', err);
      throw err;
    }
  };

  const updateService = async (serviceId: string, serviceData: Partial<Service>) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        SERVICES_COLLECTION_ID,
        serviceId,
        serviceData
      );
      await fetchServices();
      return true;
    } catch (err) {
      console.error('Error updating service:', err);
      throw err;
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        SERVICES_COLLECTION_ID,
        serviceId
      );
      await fetchServices();
      return true;
    } catch (err) {
      console.error('Error deleting service:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refreshServices: fetchServices,
  };
};
