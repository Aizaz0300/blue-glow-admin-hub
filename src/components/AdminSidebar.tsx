
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  Settings,
  Activity,
  FileText
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Service Providers",
    url: "/providers",
    icon: UserCheck,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/services",
    icon: Activity,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r-0 shadow-xl">
      <div className="sidebar-gradient h-full">
        <SidebarHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">HealthCare</h2>
              <p className="text-xs text-blue-100">Admin Panel</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="pt-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-100 text-xs uppercase tracking-wider px-4 mb-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname === item.url}
                      className="group hover:bg-white/10 data-[active=true]:bg-white/20 data-[active=true]:text-white text-blue-100 transition-all duration-200 rounded-lg mx-0"
                    >
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
