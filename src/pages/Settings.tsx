
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    adminName: "Admin User",
    adminEmail: "admin@healthcare.com",
    companyName: "HealthCare Platform",
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    maintenanceMode: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Updated",
      description: "System configuration has been updated successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your admin profile and system configuration</p>
      </div>

      {/* Admin Profile Settings */}
      <Card className="gradient-card border-0 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Admin Profile</CardTitle>
          <CardDescription>Update your personal information and credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">Full Name</Label>
              <Input
                id="adminName"
                value={settings.adminName}
                onChange={(e) => setSettings({...settings, adminName: e.target.value})}
                className="transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email Address</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                className="transition-all duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => setSettings({...settings, companyName: e.target.value})}
              className="transition-all duration-200"
            />
          </div>
          <div className="pt-4">
            <Button onClick={handleSaveProfile} className="gradient-primary text-white">
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="gradient-card border-0 animate-slide-up" style={{animationDelay: '100ms'}}>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Change Password</CardTitle>
          <CardDescription>Update your login password for enhanced security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="transition-all duration-200"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button className="gradient-primary text-white">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="gradient-card border-0 animate-slide-up" style={{animationDelay: '200ms'}}>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Notification Preferences</CardTitle>
          <CardDescription>Configure how you receive system notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-gray-900">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-gray-900">SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
            />
          </div>
          <div className="pt-4">
            <Button onClick={handleSaveNotifications} className="gradient-primary text-white">
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="gradient-card border-0 animate-slide-up" style={{animationDelay: '300ms'}}>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">System Configuration</CardTitle>
          <CardDescription>Manage platform-wide settings and features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-gray-900">Auto-Approve Providers</Label>
              <p className="text-sm text-gray-600">Automatically approve new provider registrations</p>
            </div>
            <Switch
              checked={settings.autoApproval}
              onCheckedChange={(checked) => setSettings({...settings, autoApproval: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-gray-900">Maintenance Mode</Label>
              <p className="text-sm text-gray-600">Enable maintenance mode to restrict user access</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
          </div>
          <div className="pt-4 flex gap-3">
            <Button onClick={handleSaveSystem} className="gradient-primary text-white">
              Save System Settings
            </Button>
            <Button variant="outline">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
