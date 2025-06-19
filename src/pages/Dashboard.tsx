
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Calendar, Activity } from "lucide-react";

const Dashboard = () => {
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
      value: "7",
      change: "-2%",
      icon: Activity,
      color: "from-cyan-500 to-cyan-600"
    },
  ];

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
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your healthcare system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "New provider registration", time: "2 minutes ago", type: "provider" },
              { action: "Appointment scheduled", time: "15 minutes ago", type: "appointment" },
              { action: "Patient profile updated", time: "1 hour ago", type: "patient" },
              { action: "Service provider approved", time: "2 hours ago", type: "approval" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'provider' ? 'bg-blue-500' :
                  activity.type === 'appointment' ? 'bg-green-500' :
                  activity.type === 'patient' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
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
    </div>
  );
};

export default Dashboard;
