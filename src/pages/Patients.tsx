import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { useToast } from "@/components/ui/use-toast";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { patients, loading, error } = usePatients();
  const { toast } = useToast();

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const searchString = searchTerm.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const email = patient.email.toLowerCase();
    const phone = patient.phone.toLowerCase();
    
    return fullName.includes(searchString) || 
           email.includes(searchString) || 
           phone.includes(searchString);
  });

  // Show error toast only when error changes
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.length === 0 ? (
          <Card className="p-8 text-center col-span-full">
            <p className="text-gray-600">
              {searchTerm ? "No patients found matching your search" : "No patients available"}
            </p>
          </Card>
        ) : (
          filteredPatients.map((patient, index) => (
            <Card 
              key={patient.$id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-inner">
                    {patient.profileImage ? (
                      <img 
                        src={patient.profileImage} 
                        alt={`${patient.firstName} ${patient.lastName}`} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      `${patient.firstName[0]}${patient.lastName[0]}`
                    )}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {patient.firstName} {patient.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        ID: {patient.$id.substring(0, 8)}
                      </Badge>
                      <Badge variant="outline">
                        {calculateAge(patient.dateOfBirth)} years old
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900">{patient.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Phone Number
                      </label>
                      <p className="text-gray-900">{patient.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Gender
                      </label>
                      <p className="text-gray-900 capitalize">{patient.gender}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Date of Birth
                      </label>
                      <p className="text-gray-900">
                        {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Residential Address
                      </label>
                      <p className="text-gray-900">{patient.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
