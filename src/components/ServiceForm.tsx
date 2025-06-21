import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FLUTTER_HEALTH_ICONS } from "@/utils/flutterIcons";
import { Service } from "@/types/models";

interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Service, '$id'>) => Promise<void>;
  initialData?: Service;
}

const hexToFF = (hex: string): string => {
  // Remove # if present
  hex = hex.replace('#', '');
  // Add alpha channel (FF) and convert to uppercase
  return `0xFF${hex.toUpperCase()}`;
};

export function ServiceForm({ open, onClose, onSubmit, initialData }: ServiceFormProps) {
  const [formData, setFormData] = useState<Omit<Service, '$id'>>({
    name: initialData?.name || '',
    service: initialData?.service || '',
    icon: initialData?.icon || FLUTTER_HEALTH_ICONS[0].name,
    color: initialData?.color || '#000000',
    bgColor: initialData?.bgColor || '#FFFFFF',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert colors to 0xFF format before submission
    const convertedData = {
      ...formData,
      color: hexToFF(formData.color),
      bgColor: hexToFF(formData.bgColor),
    };
    await onSubmit(convertedData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service Role</Label>
            <Input
              id="service"
              value={formData.service}
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an icon">
                  <div className="flex items-center gap-2">
                    <span className="material-icons">{formData.icon}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {FLUTTER_HEALTH_ICONS.map((icon) => (
                  <SelectItem key={icon.name} value={icon.name}>
                    <div className="flex items-center gap-2">
                      <span>{icon.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Main Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-16"
                required
              />
              <Input
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bgColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="bgColor"
                type="color"
                value={formData.bgColor}
                onChange={(e) => setFormData(prev => ({ ...prev, bgColor: e.target.value }))}
                className="w-16"
                required
              />
              <Input
                value={formData.bgColor}
                onChange={(e) => setFormData(prev => ({ ...prev, bgColor: e.target.value }))}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Create'} Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
