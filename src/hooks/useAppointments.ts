import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, APPOINTMENTS_COLLECTION_ID } from '@/lib/appwrite';
import { Appointment } from '@/types/models';
import { Query } from 'appwrite';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPOINTMENTS_COLLECTION_ID
      );
      setAppointments(response.documents.map((document: any) => document as Appointment));
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        APPOINTMENTS_COLLECTION_ID,
        appointmentId,
        { status }
      );
      await fetchAppointments(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error updating appointment:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    refreshAppointments: fetchAppointments,
    updateAppointmentStatus
  };
};
