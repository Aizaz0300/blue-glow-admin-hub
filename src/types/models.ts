export interface UserModel {
  profileImage: string;
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string; // ISO date string
  gender: string;
}

export interface TimeWindow {
  start: string; // "HH:mm" format
  end: string; // "HH:mm" format
}

export interface DayAvailability {
  isAvailable: boolean;
  timeWindows: TimeWindow[];
}

export interface Availability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // icon name or class
}

export interface LicenseInfo {
  licenseNumber: string;
  issuingAuthority: string;
  issueDate: string; // ISO date string
  expiryDate: string; // ISO date string
  licenseImageUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
}

export interface ServiceProvider {
  $id: string;
  name: string;
  email: string;
  gender: string;
  imageUrl: string;
  services: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  experience: number;
  about: string;
  availability: Availability;
  address: string;
  cnic: string[]; // URL images
  gallery: string[]; // Equipment URL images
  certifications: string[]; // URL images
  socialLinks: SocialLink[];
  reviewList: Review[];
  licenseInfo: LicenseInfo;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Appointment {
  $id: string;
  userId: string;
  providerId: string;
  username: string;
  providerName: string;
  userImageURL: string;
  providerImageURL: string;
  service: string;
  date: string; // ISO date string
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
  duration: number; // in minutes
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'disputed' | 'resolved';
  cost: number;
  destinationAddress: string;
  hasReview: boolean;
}

export interface Service {
  $id: string;
  name: string;
  service: string;
  icon: string;
  color: string;
  bgColor: string;
}
