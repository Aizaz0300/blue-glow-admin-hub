
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with Appwrite queries
  const services = [
    {
      id: 1,
      name: "Home Nursing",
      description: "Professional nursing care in the comfort of your home",
      category: "Medical Care",
      price: "$80/hour",
      providers: 15,
      status: "active",
      rating: 4.8,
      features: ["24/7 Availability", "Licensed Nurses", "Emergency Response"]
    },
    {
      id: 2,
      name: "Physical Therapy",
      description: "Rehabilitation and physical therapy services",
      category: "Therapy",
      price: "$95/session",
      providers: 8,
      status: "active",
      rating: 4.9,
      features: ["Personalized Plans", "Equipment Provided", "Progress Tracking"]
    },
    {
      id: 3,
      name: "Home Care Assistant",
      description: "Daily living assistance and companionship",
      category: "Personal Care",
      price: "$30/hour",
      providers: 22,
      status: "active",
      rating: 4.7,
      features: ["Meal Preparation", "Medication Reminders", "Companionship"]
    },
    {
      id: 4,
      name: "Mental Health Counseling",
      description: "Professional counseling and mental health support",
      category: "Mental Health",
      price: "$120/session",
      providers: 5,
      status: "pending",
      rating: 4.6,
      features: ["Licensed Therapists", "Video Sessions", "Flexible Scheduling"]
    },
  ];

  const handleToggleStatus = (serviceId: number, serviceName: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: `Service ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `${serviceName} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
    });
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600">Manage healthcare services offered on your platform</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button className="gradient-primary text-white">
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service, index) => (
          <Card key={service.id} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">{service.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">{service.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge 
                      className={`${
                        service.status === 'active' ? 'bg-green-100 text-green-800' :
                        service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      } border-0`}
                    >
                      {service.status.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className="border-0">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{service.price}</p>
                  <p className="text-sm text-gray-500">{service.providers} providers</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit Service
                  </Button>
                  <Button variant="outline" size="sm">
                    View Providers
                  </Button>
                </div>
                <Button
                  onClick={() => handleToggleStatus(service.id, service.name, service.status)}
                  className={`${
                    service.status === 'active' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                  size="sm"
                >
                  {service.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
