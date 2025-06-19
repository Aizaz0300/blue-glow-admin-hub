
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with Appwrite queries
  const patients = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8901",
      age: 65,
      address: "123 Main St, City, State",
      lastVisit: "2024-01-15",
      status: "active",
      conditions: ["Diabetes", "Hypertension"]
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary.johnson@email.com",
      phone: "+1 234 567 8902",
      age: 72,
      address: "456 Oak Ave, City, State",
      lastVisit: "2024-01-12",
      status: "inactive",
      conditions: ["Arthritis"]
    },
    {
      id: 3,
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 234 567 8903",
      age: 58,
      address: "789 Pine Rd, City, State",
      lastVisit: "2024-01-18",
      status: "active",
      conditions: ["Post-Surgery Care"]
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">View and manage patient profiles</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button className="gradient-primary text-white">
            Add Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPatients.map((patient, index) => (
          <Card key={patient.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{patient.name}</CardTitle>
                    <CardDescription className="text-gray-600">Age: {patient.age} years</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        className={`${
                          patient.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        } border-0`}
                      >
                        {patient.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">Last visit: {patient.lastVisit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <p className="text-sm text-gray-600">{patient.email}</p>
                  <p className="text-sm text-gray-600">{patient.phone}</p>
                  <p className="text-sm text-gray-600">{patient.address}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Medical Conditions</h4>
                  <div className="flex flex-wrap gap-1">
                    {patient.conditions.map((condition, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      Schedule Appointment
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      View History
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

export default Patients;
