import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ServiceProvider } from "@/types/models";
import ServiceProviderProfile from "@/components/ServiceProviderProfile";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { Loader2 } from "lucide-react";

const ServiceProviders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { providers, loading, error, updateProviderStatus } = useServiceProviders();

  const handleApprove = async (providerId: string) => {
    const provider = providers.find(p => p.$id === providerId);
    const success = await updateProviderStatus(providerId, 'approved');
    
    if (success) {
      toast({
        title: "Provider Approved",
        description: `${provider?.name} has been approved successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to approve provider",
        variant: "destructive",
      });
    }
  };

  useEffect(() => { 
    console.log("Service Providers Loaded:", providers);
  }
, [providers]);


  const handleReject = async (providerId: string) => {
    const provider = providers.find(p => p.$id === providerId);
    const success = await updateProviderStatus(providerId, 'rejected');
    
    if (success) {
      toast({
        title: "Provider Rejected",
        description: `${provider?.name}'s application has been rejected`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to reject provider",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsProfileOpen(true);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Providers</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No service providers found</p>
            </div>
          ) : (
            filteredProviders.map((provider, index) => (
              <Card 
                key={provider.$id} 
                className="gradient-card border-0 hover-lift animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
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
                            onClick={() => handleApprove(provider.$id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(provider.$id)}
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
                      <p className="text-sm text-gray-600">Provider ID: {provider.$id}</p>
                      <p className="text-sm text-gray-600">Experience: {provider.experience} years</p>
                      <p className="text-sm text-gray-600">Gender: {provider.gender}</p>
                      <p className="text-sm text-gray-600">License: {provider.licenseInfo.licenseNumber}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Actions</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(provider)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

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
