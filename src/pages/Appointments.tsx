
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Filter, Search } from "lucide-react";
import { Appointment } from "@/types/models";
import AppointmentCard from "@/components/AppointmentCard";

const Appointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data with new status types
  const appointments: Appointment[] = [
    {
      id: "apt_001",
      userId: "user_123",
      providerId: "prov_456",
      username: "John Smith",
      providerName: "Dr. Sarah Johnson",
      userImageURL: "",
      providerImageURL: "",
      service: "Home Nursing",
      date: "2024-01-20",
      startTime: "10:00",
      endTime: "11:00",
      duration: 60,
      notes: "Patient requires blood pressure monitoring and medication administration",
      status: "active",
      cost: 85,
      destinationAddress: "123 Main St, City, State 12345",
      hasReview: false
    },
    {
      id: "apt_002",
      userId: "user_456",
      providerId: "prov_789",
      username: "Mary Johnson",
      providerName: "Michael Chen",
      userImageURL: "",
      providerImageURL: "",
      service: "Physical Therapy",
      date: "2024-01-20",
      startTime: "14:00",
      endTime: "14:45",
      duration: 45,
      notes: "Post-surgery rehabilitation for knee replacement",
      status: "pending",
      cost: 120,
      destinationAddress: "456 Oak Ave, City, State 12345",
      hasReview: false
    },
    {
      id: "apt_003",
      userId: "user_789",
      providerId: "prov_012",
      username: "Robert Wilson",
      providerName: "Emily Rodriguez",
      userImageURL: "",
      providerImageURL: "",
      service: "Home Care Assistant",
      date: "2024-01-19",
      startTime: "09:00",
      endTime: "10:30",
      duration: 90,
      notes: "Daily living assistance and companionship",
      status: "completed",
      cost: 95,
      destinationAddress: "789 Pine Rd, City, State 12345",
      hasReview: true
    },
    {
      id: "apt_004",
      userId: "user_012",
      providerId: "prov_345",
      username: "Lisa Brown",
      providerName: "Dr. James Wilson",
      userImageURL: "",
      providerImageURL: "",
      service: "Medical Consultation",
      date: "2024-01-18",
      startTime: "15:30",
      endTime: "16:00",
      duration: 30,
      notes: "Follow-up consultation for chronic condition management",
      status: "rejected",
      cost: 75,
      destinationAddress: "321 Elm St, City, State 12345",
      hasReview: false
    },
    {
      id: "apt_005",
      userId: "user_013",
      providerId: "prov_346",
      username: "David Miller",
      providerName: "Dr. Amanda Davis",
      userImageURL: "",
      providerImageURL: "",
      service: "Home Nursing",
      date: "2024-01-21",
      startTime: "11:00",
      endTime: "12:00",
      duration: 60,
      notes: "Wound care and medication management",
      status: "confirmed",
      cost: 90,
      destinationAddress: "654 Maple Ave, City, State 12345",
      hasReview: false
    },
    {
      id: "apt_006",
      userId: "user_014",
      providerId: "prov_347",
      username: "Susan Taylor",
      providerName: "Mark Thompson",
      userImageURL: "",
      providerImageURL: "",
      service: "Physical Therapy",
      date: "2024-01-17",
      startTime: "16:00",
      endTime: "17:00",
      duration: 60,
      notes: "Cancelled due to weather conditions",
      status: "cancelled",
      cost: 110,
      destinationAddress: "987 Oak St, City, State 12345",
      hasReview: false
    }
  ];

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

  const handleReschedule = (appointmentId: string) => {
    toast({
      title: "Reschedule Appointment",
      description: "Appointment rescheduling dialog would open here",
    });
  };

  const handleCancel = (appointmentId: string) => {
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled successfully",
      variant: "destructive",
    });
  };

  const handleViewDetails = (appointmentId: string) => {
    toast({
      title: "Appointment Details",
      description: "Detailed appointment view would open here",
    });
  };

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
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                  <div key={appointment.id} className="animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
                    <AppointmentCard
                      appointment={appointment}
                      onReschedule={handleReschedule}
                      onCancel={handleCancel}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
