import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Filter, Search, Loader2 } from "lucide-react";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/hooks/useAppointments";

const Appointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { appointments, loading, error, updateAppointmentStatus } = useAppointments();

  const getAppointmentsByStatus = (status: string) => {
    if (status === "all") return appointments;
    return appointments.filter(apt => apt.status === status);
  };

  const filteredAppointments = getAppointmentsByStatus(activeTab).filter(appointment =>
    appointment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.destinationAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancel = async (appointmentId: string) => {
    try {
      await updateAppointmentStatus(appointmentId, 'cancelled');
      toast({
        title: "Appointment Cancelled",
        description: "The appointment has been cancelled successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading appointments</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Monitor and manage all healthcare appointments</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Appointments Tabs */}
      <Card className="gradient-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900">All Appointments</CardTitle>
              <CardDescription>Filter and manage appointments by status</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({appointments.filter(apt => apt.status === 'active').length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({appointments.filter(apt => apt.status === 'pending').length})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({appointments.filter(apt => apt.status === 'confirmed').length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({appointments.filter(apt => apt.status === 'completed').length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({appointments.filter(apt => apt.status === 'rejected').length})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({appointments.filter(apt => apt.status === 'cancelled').length})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredAppointments.map((appointment, index) => (
                    <div key={appointment.$id} className="animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
                      <AppointmentCard
                        appointment={appointment}
                        onCancel={handleCancel}
                      />
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
