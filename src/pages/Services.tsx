import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/useServices";
import { ServiceForm } from "@/components/ServiceForm";
import { Service } from "@/types/models";

const ffToHex = (ffColor: string): string => {
  return "#" + ffColor.replace("0xFF", "");
};

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();

  const { services, loading, addService, updateService, deleteService } =
    useServices();

  const handleSubmit = async (data: Omit<Service, "$id">) => {
    try {
      if (editingService) {
        await updateService(editingService.$id!, data);
        toast({
          title: "Service Updated",
          description: "The service has been updated successfully.",
        });
      } else {
        await addService(data);
        toast({
          title: "Service Created",
          description: "The new service has been created successfully.",
        });
      }
      setIsFormOpen(false);
      setEditingService(undefined);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (serviceId: string) => {
    try {
      await deleteService(serviceId);
      toast({
        title: "Service Deleted",
        description: "The service has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-gray-600">
            Manage healthcare services offered on your platform
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            className="gradient-primary text-white"
            onClick={() => {
              setEditingService(undefined);
              setIsFormOpen(true);
            }}
          >
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.$id} className="hover:shadow-lg transition-shadow">
            <CardHeader >
              <CardTitle className="inline-block">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.service}</p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(service.$id!)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ServiceForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingService(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={editingService}
      />
    </div>
  );
};

export default Services;
