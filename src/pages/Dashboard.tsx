import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Calendar, Activity, Star, Clock } from "lucide-react";
import { ServiceProvider } from "@/types/models";
import ServiceProviderProfile from "@/components/ServiceProviderProfile";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // Mock data - replace with Appwrite queries
  const pendingProviders: ServiceProvider[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      gender: "Female",
      imageUrl: "",
      services: ["Home Nursing", "Elderly Care"],
      rating: 4.8,
      reviewCount: 23,
      phone: "+1 234 567 8901",
      experience: 5,
      about: "Experienced registered nurse specializing in home-based patient care with 5+ years of experience in critical care and rehabilitation.",
      address: "123 Main St, City, State 12345",
      cnic: ["/placeholder.svg", "/placeholder.svg"],
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      certifications: ["/placeholder.svg", "/placeholder.svg"],
      socialLinks: [],
      reviewList: [
        {
          id: "1",
          userName: "John Smith",
          userImage: "",
          rating: 5,
          comment: "Excellent care for my elderly mother. Very professional and caring.",
          date: "2024-01-10"
        }
      ],
      licenseInfo: {
        licenseNumber: "RN123456",
        issuingAuthority: "State Board of Nursing",
        issueDate: "2020-01-15",
        expiryDate: "2025-01-15",
        licenseImageUrl: "/placeholder.svg"
      },
      availability: {
        monday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        tuesday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        wednesday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        thursday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        friday: { isAvailable: true, timeWindows: [{ start: "09:00", end: "17:00" }] },
        saturday: { isAvailable: false, timeWindows: [] },
        sunday: { isAvailable: false, timeWindows: [] }
      },
      status: "pending"
    },
    {
      id: "2", 
      name: "Michael Chen",
      email: "michael.chen@email.com",
      gender: "Male",
      imageUrl: "",
      services: ["Physical Therapy", "Rehabilitation"],
      rating: 4.9,
      reviewCount: 41,
      phone: "+1 234 567 8902",
      experience: 8,
      about: "Licensed physical therapist with extensive experience in home-based rehabilitation and injury recovery programs.",
      address: "456 Oak Ave, City, State 12345",
      cnic: ["/placeholder.svg", "/placeholder.svg"],
      gallery: ["/placeholder.svg", "/placeholder.svg"],
      certifications: ["/placeholder.svg"],
      socialLinks: [],
      reviewList: [],
      licenseInfo: {
        licenseNumber: "PT789012",
        issuingAuthority: "Physical Therapy Board",
        issueDate: "2018-03-20",
        expiryDate: "2025-03-20",
        licenseImageUrl: "/placeholder.svg"
      },
      availability: {
        monday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        tuesday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        wednesday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        thursday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        friday: { isAvailable: true, timeWindows: [{ start: "08:00", end: "16:00" }] },
        saturday: { isAvailable: true, timeWindows: [{ start: "10:00", end: "14:00" }] },
        sunday: { isAvailable: false, timeWindows: [] }
      },
      status: "pending"
    }
  ];

  const stats = [
    {
      title: "Total Providers",
      value: "124",
      change: "+12%",
      icon: UserCheck,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Patients",
      value: "2,847",
      change: "+8%",
      icon: Users,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Appointments Today",
      value: "43",
      change: "+15%",
      icon: Calendar,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Pending Approvals",
      value: pendingProviders.length.toString(),
      change: "-2%",
      icon: Activity,
      color: "from-cyan-500 to-cyan-600"
    },
  ];

  const handleViewProfile = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setProfileDialogOpen(true);
  };

  const handleApprove = (providerId: string) => {
    toast({
      title: "Provider Approved",
      description: "The service provider has been approved successfully",
    });
    setProfileDialogOpen(false);
  };

  const handleReject = (providerId: string) => {
    toast({
      title: "Provider Rejected",
      description: "The service provider application has been rejected",
      variant: "destructive",
    });
    setProfileDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your healthcare platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className={`gradient-card hover-lift animate-slide-up border-0 overflow-hidden`} style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card border-0 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Pending Provider Requests</CardTitle>
            <CardDescription>Service providers awaiting approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingProviders.map((provider, index) => (
              <div key={provider.id} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-500">{provider.services.join(", ")}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{provider.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{provider.experience}y exp</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleViewProfile(provider)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Commonly used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Approve Providers", description: "Review pending provider applications", color: "from-blue-500 to-blue-600" },
              { title: "Add New Service", description: "Create new healthcare service", color: "from-indigo-500 to-indigo-600" },
              { title: "View Reports", description: "Check system analytics", color: "from-purple-500 to-purple-600" },
              { title: "Manage Appointments", description: "Handle booking requests", color: "from-cyan-500 to-cyan-600" },
            ].map((action, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all duration-200 cursor-pointer border border-blue-100/50">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md`}>
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ServiceProviderProfile
        provider={selectedProvider}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default Dashboard;
