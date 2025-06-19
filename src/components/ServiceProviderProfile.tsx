
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceProvider } from "@/types/models";
import { Star, Calendar, MapPin, Phone, Mail, Award, Clock, Users } from "lucide-react";

interface ServiceProviderProfileProps {
  provider: ServiceProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (providerId: string) => void;
  onReject: (providerId: string) => void;
}

const ServiceProviderProfile = ({ 
  provider, 
  open, 
  onOpenChange, 
  onApprove, 
  onReject 
}: ServiceProviderProfileProps) => {
  if (!provider) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Service Provider Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with basic info */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              {provider.imageUrl ? (
                <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-semibold text-xl">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{provider.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">{provider.rating} ({provider.reviewCount} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {provider.services.map((service, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">{service}</Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-500" />
                  <span>{provider.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{provider.address}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="availability">Schedule</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{provider.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>License Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>License Number:</strong> {provider.licenseInfo.licenseNumber}</div>
                  <div><strong>Issuing Authority:</strong> {provider.licenseInfo.issuingAuthority}</div>
                  <div><strong>Issue Date:</strong> {formatDate(provider.licenseInfo.issueDate)}</div>
                  <div><strong>Expiry Date:</strong> {formatDate(provider.licenseInfo.expiryDate)}</div>
                  {provider.licenseInfo.licenseImageUrl && (
                    <div>
                      <strong>License Document:</strong>
                      <img src={provider.licenseInfo.licenseImageUrl} alt="License" className="mt-2 max-w-xs rounded border" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>CNIC Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {provider.cnic.map((url, index) => (
                        <img key={index} src={url} alt={`CNIC ${index + 1}`} className="w-full rounded border" />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {provider.certifications.map((url, index) => (
                        <img key={index} src={url} alt={`Certification ${index + 1}`} className="w-full rounded border" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Weekly Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(provider.availability).map(([day, schedule]) => (
                      <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="font-medium">{getDayName(day)}</div>
                        <div>
                          {schedule.isAvailable ? (
                            <div className="space-y-1">
                              {schedule.timeWindows.map((window, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                  {window.start} - {window.end}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not Available</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment & Workspace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {provider.gallery.map((url, index) => (
                      <img key={index} src={url} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded border" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Client Reviews ({provider.reviewList.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {provider.reviewList.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {review.userImage ? (
                              <img src={review.userImage} alt={review.userName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                                {review.userName[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.userName}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action buttons for pending providers */}
          {provider.status === 'pending' && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => onApprove(provider.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Approve Provider
              </Button>
              <Button
                onClick={() => onReject(provider.id)}
                variant="destructive"
                className="flex-1"
              >
                Reject Application
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceProviderProfile;
