import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  Calendar,
  Activity,
  Star,
  Clock,
  ChartBar,
  HardDrive,
  FileBox,
} from "lucide-react";

import { ServiceProvider } from "@/types/models";
import ServiceProviderProfile from "@/components/ServiceProviderProfile";
import { useToast } from "@/hooks/use-toast";
import { useAppwriteData } from "@/hooks/useAppwriteData";
import { Skeleton } from "@/components/ui/skeleton";
import { useServiceProviders } from "@/hooks/useServiceProviders";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const { stats, pendingProviders, allProviders, loading, error, bucketUsage } =
    useAppwriteData();

  const { updateProviderStatus } = useServiceProviders();

  const statsData = [
    {
      title: "Total Providers",
      value: stats.totalProviders.toString(),
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
      description: "Healthcare professionals",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      description: "Registered users",
    },
    {
      title: "Appointments Today",
      value: stats.appointmentsToday.toString(),
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      description: "Scheduled sessions",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals.toString(),
      icon: Activity,
      color: "from-cyan-500 to-cyan-600",
      description: "Awaiting review",
    },
  ];

  const providerStats = {
    approved: allProviders.filter((p) => p.status === "approved").length,
    pending: allProviders.filter((p) => p.status === "pending").length,
    rejected: allProviders.filter((p) => p.status === "rejected").length,
    total: allProviders.length,
  };

  useEffect(() => {
    console.log("All Providers:", allProviders);
    console.log("Provider Stats:", providerStats);
  }, [allProviders]);

  const calculatePercentage = (count: number) => {
    if (providerStats.total === 0) return 0;
    return ((count / providerStats.total) * 100).toFixed(1);
  };

  const formatStorage = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  const filteredProviders = allProviders.filter((provider) => {
    const isPending = provider.status === "pending";

    return isPending;
  });

  const handleViewProfile = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setProfileDialogOpen(true);
  };

  const handleApprove = async (providerId: string) => {
    const provider = pendingProviders.find((p) => p.$id === providerId);
    const success = await updateProviderStatus(providerId, "approved");

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

  const handleReject = async (providerId: string) => {
    const provider = pendingProviders.find((p) => p.$id === providerId);
    const success = await updateProviderStatus(providerId, "rejected");

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

  const handlePending = async (providerId: string) => {
    const provider = pendingProviders.find((p) => p.$id === providerId);
    const success = await updateProviderStatus(providerId, "pending");

    if (success) {
      toast({
        title: "Provider Status Updated",
        description: `${provider?.name}'s status has been set to pending`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update provider status",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-0 bg-white/50 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ProvidersSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50"
        >
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your healthcare platform.
        </p>
      </div>

      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-0 bg-white/50 backdrop-blur-lg hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`absolute inset-0 opacity-5 bg-gradient-to-br ${stat.color}`}
              />
              <CardHeader className="pb-2">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {stat.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card border-0 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Provider Analytics
            </CardTitle>
            <CardDescription>
              Analyze provider applications distribution and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ChartBar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold">
                  Application Statistics
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {calculatePercentage(providerStats.approved)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    Approved ({providerStats.approved})
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {calculatePercentage(providerStats.pending)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    Pending ({providerStats.pending})
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {calculatePercentage(providerStats.rejected)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    Rejected ({providerStats.rejected})
                  </p>
                </div>
              </div>
            </div>

            {/* Show Documents Bucket Usage Data */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold">
                  Documents Storage Usage
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileBox className="w-5 h-5 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">
                      {bucketUsage.filesCount}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Total Documents</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">
                      {formatStorage(bucketUsage.storage)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Storage Used</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Pending Provider Requests
            </CardTitle>
            <CardDescription>
              Service providers awaiting approval
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <ProvidersSkeleton />
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <div
                  key={provider.$id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {provider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {provider.name}
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-500">
                        {provider.services.join(", ")}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">
                          {provider.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {provider.experience}y exp
                        </span>
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
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No providers match the selected filters
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ServiceProviderProfile
        provider={selectedProvider}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        onApprove={handleApprove}
        onReject={handleReject}
        onPending={handlePending}
      />
    </div>
  );
};

export default Dashboard;
