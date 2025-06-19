
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  // Mock data - replace with Appwrite queries
  const activityLogs = [
    {
      id: 1,
      action: "Provider Registration",
      user: "Dr. Sarah Johnson",
      timestamp: "2024-01-20 10:30 AM",
      type: "registration",
      details: "New provider registered for Home Nursing services"
    },
    {
      id: 2,
      action: "Appointment Scheduled",
      user: "Admin User",
      timestamp: "2024-01-20 09:15 AM",
      type: "appointment",
      details: "Scheduled appointment for John Smith with Michael Chen"
    },
    {
      id: 3,
      action: "Service Approved",
      user: "Admin User",
      timestamp: "2024-01-19 04:45 PM",
      type: "approval",
      details: "Approved Mental Health Counseling service"
    },
    {
      id: 4,
      action: "Patient Profile Updated",
      user: "Mary Johnson",
      timestamp: "2024-01-19 02:20 PM",
      type: "update",
      details: "Updated contact information and medical conditions"
    },
    {
      id: 5,
      action: "Provider Rejected",
      user: "Admin User",
      timestamp: "2024-01-19 11:30 AM",
      type: "rejection",
      details: "Rejected provider application due to incomplete documentation"
    },
  ];

  const systemStats = [
    { label: "Total Users", value: "3,247", change: "+12%" },
    { label: "Appointments This Month", value: "1,425", change: "+8%" },
    { label: "Active Providers", value: "124", change: "+15%" },
    { label: "Revenue", value: "$45,890", change: "+22%" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Activity Logs</h1>
          <p className="text-gray-600">Monitor system activity and generate reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Export Logs
          </Button>
          <Button className="gradient-primary text-white">
            Generate Report
          </Button>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={stat.label} className={`gradient-card border-0 hover-lift animate-slide-up`} style={{animationDelay: `${index * 100}ms`}}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Logs */}
      <Card className="gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Recent Activity Logs</CardTitle>
          <CardDescription>Track all system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <div 
                key={log.id} 
                className={`flex items-start gap-4 p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200 animate-slide-up border border-blue-100/50`}
                style={{animationDelay: `${index * 50}ms`}}
              >
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  log.type === 'registration' ? 'bg-blue-500' :
                  log.type === 'appointment' ? 'bg-green-500' :
                  log.type === 'approval' ? 'bg-purple-500' :
                  log.type === 'update' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{log.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          className={`text-xs ${
                            log.type === 'registration' ? 'bg-blue-100 text-blue-800' :
                            log.type === 'appointment' ? 'bg-green-100 text-green-800' :
                            log.type === 'approval' ? 'bg-purple-100 text-purple-800' :
                            log.type === 'update' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          } border-0`}
                        >
                          {log.type}
                        </Badge>
                        <span className="text-xs text-gray-500">by {log.user}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Generation */}
      <Card className="gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Quick Reports</CardTitle>
          <CardDescription>Generate common reports with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Provider Performance", description: "Monthly provider ratings and statistics" },
              { title: "Revenue Report", description: "Financial overview and earnings breakdown" },
              { title: "User Engagement", description: "Patient and provider activity metrics" },
              { title: "Service Analytics", description: "Most popular services and demand trends" },
              { title: "System Health", description: "Platform performance and uptime metrics" },
              { title: "Security Audit", description: "User access logs and security events" },
            ].map((report, index) => (
              <div 
                key={report.title}
                className={`p-4 rounded-lg bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all duration-200 cursor-pointer border border-blue-100/50 animate-slide-up`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
