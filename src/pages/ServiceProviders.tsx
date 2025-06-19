
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ServiceProvider } from "@/types/models";
import ServiceProviderProfile from "@/components/ServiceProviderProfile";

const ServiceProviders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock data using ServiceProvider structure
  const providers: ServiceProvider[] = [
    {
      id: "prov_001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      gender: "Female",
      imageUrl: "",
      services: ["Home Nursing", "Wound Care"],
      rating: 4.8,
      reviewCount: 45,
      phone: "+1 234 567 8901",
      experience: 5,
      about: "Experienced registered nurse specializing in home healthcare and wound care management.",
      availability: {
        monday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        tuesday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        wednesday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        thursday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        friday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        saturday: { isAvailable: false, timeWindows: [] },
        sunday: { isAvailable: false, timeWindows: [] }
      },
      address: "Downtown Medical District, City, State",
      cnic: [],
      gallery: [],
      certifications: [],
      socialLinks: [],
      reviewList: [],
      licenseInfo: {
        licenseNumber: "RN123456",
        issuingAuthority: "State Nursing Board",
        issueDate: "2019-01-15",
        expiryDate: "2025-01-15",
        licenseImageUrl: ""
      },
      status: "pending"
    },
    {
      id: "prov_002",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      gender: "Male",
      imageUrl: "",
      services: ["Physical Therapy", "Rehabilitation"],
      rating: 4.9,
      reviewCount: 67,
      phone: "+1 234 567 8902",
      experience: 8,
      about: "Licensed physical therapist with expertise in post-surgical rehabilitation and mobility training.",
      availability: {
        monday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        tuesday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        wednesday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        thursday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        friday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        saturday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "13:00" }] },
        sunday: { isAvailable: false, timeWindows: [] }
      },
      address: "Westside Clinic, City, State",
      cnic: [],
      gallery: [],
      certifications: [],
      socialLinks: [],
      reviewList: [],
      licenseInfo: {
        licenseNumber: "PT789012",
        issuingAuthority: "Physical Therapy Board",
        issueDate: "2016-06-10",
        expiryDate: "2024-06-10",
        licenseImageUrl: ""
      },
      status: "approved"
    },
    {
      id: "prov_003",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      gender: "Female",
      imageUrl: "",
      services: ["Home Care Assistant", "Elderly Care"],
      rating: 4.6,
      reviewCount: 32,
      phone: "+1 234 567 8903",
      experience: 3,
      about: "Compassionate home care assistant specializing in elderly care and daily living support.",
      availability: {
        monday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "18:00" }] },
        tuesday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "18:00" }] },
        wednesday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "18:00" }] },
        thursday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "18:00" }] },
        friday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "18:00" }] },
        saturday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "14:00" }] },
        sunday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "14:00" }] }
      },
      address: "Northside Community, City, State",
      cnic: [],
      gallery: [],
      certifications: [],
      socialLinks: [],
      reviewList: [],
      licenseInfo: {
        licenseNumber: "HCA345678",
        issuingAuthority: "Healthcare Assistant Board",
        issueDate: "2021-03-20",
        expiryDate: "2025-03-20",
        licenseImageUrl: ""
      },
      status: "rejected"
    },
  ];

  const handleApprove = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    toast({
      title: "Provider Approved",
      description: `${provider?.name} has been approved successfully`,
    });
  };

  const handleReject = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    toast({
      title: "Provider Rejected",
      description: `${provider?.name}'s application has been rejected`,
      variant: "destructive",
    });
  };

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsProfileOpen(true);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
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
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProviders.map((provider, index) => (
          <Card key={provider.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {provider.imageUrl ? (
                      <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      provider.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{provider.name}</CardTitle>
                    <CardDescription className="text-gray-600">{provider.services.join(", ")}</CardDescription>
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
                        <span className="text-sm text-gray-600">{provider.rating} ({provider.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {provider.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(provider.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(provider.id)}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <p className="text-sm text-gray-600">{provider.email}</p>
                  <p className="text-sm text-gray-600">{provider.phone}</p>
                  <p className="text-sm text-gray-600">{provider.address}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Professional Details</h4>
                  <p className="text-sm text-gray-600">Experience: {provider.experience} years</p>
                  <p className="text-sm text-gray-600">Gender: {provider.gender}</p>
                  <p className="text-sm text-gray-600">License: {provider.licenseInfo.licenseNumber}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(provider)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ServiceProviderProfile
        provider={selectedProvider}
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default ServiceProviders;
