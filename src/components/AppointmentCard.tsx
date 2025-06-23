import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  MessageSquare,
  Star,
} from "lucide-react";
import { Appointment } from "@/types/models";

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (appointmentId: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
}

const AppointmentCard = ({ appointment, onCancel, onStatusUpdate }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "disputed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "resolved":
        return "bg-teal-100 text-teal-800 border-teal-200";  
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="gradient-card border-0 hover-lift transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {appointment.service.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">
                {appointment.service}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={`${getStatusColor(
                    appointment.status
                  )} border text-xs font-medium`}
                >
                  {appointment.status.replace("-", " ").toUpperCase()}
                </Badge>
                {appointment.hasReview && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500">Reviewed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <span>PKR {appointment.cost}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Patient Info */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 text-sm">Patient</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={appointment.userImageURL}
                  alt={appointment.username}
                />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  {appointment.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {appointment.username}
                </p>
                <p className="text-xs text-gray-600">
                  Patient ID: {appointment.userId}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Info */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 text-sm">Provider</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={appointment.providerImageURL}
                  alt={appointment.providerName}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {appointment.providerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {appointment.providerName}
                </p>
                <p className="text-xs text-gray-600">
                  Provider ID: {appointment.providerId}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {formatDate(appointment.date)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {appointment.startTime} - {appointment.endTime} (
              {appointment.duration}min)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span
              className="text-gray-700 truncate"
              title={appointment.destinationAddress}
            >
              {appointment.destinationAddress}
            </span>
          </div>
        </div>

        {appointment.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <h4 className="font-medium text-gray-900 text-sm">Notes</h4>
              </div>
              <p className="text-sm text-gray-600 pl-6">{appointment.notes}</p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {(appointment.status === "confirmed" ||
            appointment.status === "pending") && (
            <>
              <Separator />
              <Button
                onClick={() => onCancel(appointment.$id)}
                variant="destructive"
                size="sm"
                className="text-xs"
              >
                Cancel
              </Button>
            </>
          )}

          {appointment.status === "completed" && !appointment.hasReview && (
            <Button variant="outline" size="sm" className="text-xs">
              Request Review
            </Button>
          )}

          {appointment.status === "disputed" && (
            <Button
              variant="outline"
              onClick={() => onStatusUpdate(appointment.$id, "resolved")}
              className="text-green-600 hover:text-green-700"
            >
              Mark as Resolved
            </Button>
          )}

          {appointment.status === "resolved" && (
            <Button
              variant="outline"
              onClick={() => onStatusUpdate(appointment.$id, "disputed")}
              className="text-yellow-600 hover:text-yellow-700"
            >
              Mark as Disputed Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
