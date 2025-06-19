
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ServiceProviders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with Appwrite queries
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Home Nursing",
      email: "sarah.johnson@email.com",
      phone: "+1 234 567 8901",
      status: "pending",
      joinDate: "2024-01-15",
      experience: "5 years",
      rating: 4.8
    },
    {
      id: 2,
      name: "Michael Chen",
      specialization: "Physical Therapy",
      email: "michael.chen@email.com",
      phone: "+1 234 567 8902",
      status: "approved",
      joinDate: "2024-01-10",
      experience: "8 years",
      rating: 4.9
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "Home Care Assistant",
      email: "emily.rodriguez@email.com",
      phone: "+1 234 567 8903",
      status: "rejected",
      joinDate: "2024-01-12",
      experience: "3 years",
      rating: 4.6
    },
  ];

  const handleApprove = (providerId: number, providerName: string) => {
    toast({
      title: "Provider Approved",
      description: `${providerName} has been approved successfully`,
    });
  };

  const handleReject = (providerId: number, providerName: string) => {
    toast({
      title: "Provider Rejected",
      description: `${providerName}'s application has been rejected`,
      variant: "destructive",
    });
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Provider Management</h1>
          <p className="text-gray-600">Review and manage healthcare service providers</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button className="gradient-primary text-white">
            Add Provider
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProviders.map((provider, index) => (
          <Card key={provider.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{provider.name}</CardTitle>
                    <CardDescription className="text-gray-600">{provider.specialization}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        className={`${
                          provider.status === 'approved' ? 'bg-green-100 text-green-800' :
                          provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        } border-0`}
                      >
                        {provider.status.toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{provider.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {provider.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(provider.id, provider.name)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(provider.id, provider.name)}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <p className="text-sm text-gray-600">{provider.email}</p>
                  <p className="text-sm text-gray-600">{provider.phone}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Professional Details</h4>
                  <p className="text-sm text-gray-600">Experience: {provider.experience}</p>
                  <p className="text-sm text-gray-600">Joined: {provider.joinDate}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit Profile</Button>
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

export default ServiceProviders;
