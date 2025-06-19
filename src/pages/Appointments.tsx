
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with Appwrite queries
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      providerName: "Dr. Sarah Johnson",
      service: "Home Nursing",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "scheduled",
      duration: "60 min",
      address: "123 Main St, City, State"
    },
    {
      id: 2,
      patientName: "Mary Johnson",
      providerName: "Michael Chen",
      service: "Physical Therapy",
      date: "2024-01-20",
      time: "2:00 PM",
      status: "in-progress",
      duration: "45 min",
      address: "456 Oak Ave, City, State"
    },
    {
      id: 3,
      patientName: "Robert Wilson",
      providerName: "Emily Rodriguez",
      service: "Home Care Assistant",
      date: "2024-01-21",
      time: "9:00 AM",
      status: "completed",
      duration: "90 min",
      address: "789 Pine Rd, City, State"
    },
  ];

  const handleReschedule = (appointmentId: number) => {
    toast({
      title: "Appointment Rescheduled",
      description: "The appointment has been rescheduled successfully",
    });
  };

  const handleCancel = (appointmentId: number) => {
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled",
      variant: "destructive",
    });
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Monitor and manage all appointments</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button className="gradient-primary text-white">
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredAppointments.map((appointment, index) => (
          <Card key={appointment.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {appointment.service}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {appointment.date} at {appointment.time} ({appointment.duration})
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      className={`${
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      } border-0`}
                    >
                      {appointment.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                {appointment.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleReschedule(appointment.id)}
                      variant="outline"
                      size="sm"
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={() => handleCancel(appointment.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Patient</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-600">{appointment.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Provider</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {appointment.providerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.providerName}</p>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
