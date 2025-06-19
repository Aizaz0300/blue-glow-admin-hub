
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserModel } from "@/types/models";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data using UserModel structure
  const patients: UserModel[] = [
    {
      id: "user_001",
      profileImage: "",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8901",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1959-03-15",
      gender: "Male"
    },
    {
      id: "user_002",
      profileImage: "",
      firstName: "Mary",
      lastName: "Johnson",
      email: "mary.johnson@email.com",
      phone: "+1 234 567 8902",
      address: "456 Oak Ave, City, State 12345",
      dateOfBirth: "1952-08-22",
      gender: "Female"
    },
    {
      id: "user_003",
      profileImage: "",
      firstName: "Robert",
      lastName: "Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 234 567 8903",
      address: "789 Pine Rd, City, State 12345",
      dateOfBirth: "1966-11-30",
      gender: "Male"
    },
  ];

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

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
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPatients.map((patient, index) => (
          <Card key={patient.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {patient.profileImage ? (
                      <img src={patient.profileImage} alt={`${patient.firstName} ${patient.lastName}`} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      `${patient.firstName[0]}${patient.lastName[0]}`
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{patient.firstName} {patient.lastName}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Age: {calculateAge(patient.dateOfBirth)} years • {patient.gender}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-blue-100 text-blue-800 border-0">
                        Patient ID: {patient.id.substring(0, 8)}
                      </Badge>
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
                  <h4 className="font-medium text-gray-900">Personal Details</h4>
                  <p className="text-sm text-gray-600">Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
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
