import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_EMAIL, updateAdminPassword } from "@/lib/auth";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    adminEmail: ADMIN_EMAIL,
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    maintenanceMode: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwords.newPassword.length < 8) {
      toast({
        title: "Invalid Password",
        description: "New password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateAdminPassword(passwords.currentPassword, passwords.newPassword);
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
      });
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
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
          <CardDescription>Your admin account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email Address</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              disabled
              className="transition-all duration-200 bg-gray-100"
            />
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
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
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
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                placeholder="Enter new password"
                className="transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
                className="transition-all duration-200"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button 
              onClick={handleUpdatePassword} 
              disabled={isUpdatingPassword}
              className="gradient-primary text-white"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
