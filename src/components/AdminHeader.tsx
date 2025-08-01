import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutAdmin } from "@/lib/auth";
import { ADMIN_EMAIL } from "@/lib/auth";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast({
        title: "Logged out successfully",
        description: "You have been securely logged out",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your healthcare platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">{ADMIN_EMAIL}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="gradient-primary text-white border-0 hover:shadow-lg transition-all duration-200"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
