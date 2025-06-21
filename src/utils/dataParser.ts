import { ServiceProvider, Availability, SocialLink, Review, LicenseInfo, TimeWindow } from '@/types/models';

const parseTimeWindow = (window: any): TimeWindow => {
  // Handle both string format and object format
  if (typeof window === 'object' && 'start' in window && 'end' in window) {
    if (typeof window.start === 'object' && 'hour' in window.start) {
      // Convert hour/minute format to HH:mm format
      return {
        start: `${window.start.hour.toString().padStart(2, '0')}:${window.start.minute.toString().padStart(2, '0')}`,
        end: `${window.end.hour.toString().padStart(2, '0')}:${window.end.minute.toString().padStart(2, '0')}`
      };
    }
    return window;
  }
  return { start: "00:00", end: "00:00" };
};

const parseAvailability = (availabilityData: string | Availability): Availability => {
  try {
    const data = typeof availabilityData === 'string' 
      ? JSON.parse(availabilityData)
      : availabilityData;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const parsedAvailability: Availability = {} as Availability;

    days.forEach(day => {
      const dayData = data[day] || { isAvailable: false, timeWindows: [] };
      parsedAvailability[day as keyof Availability] = {
        isAvailable: Boolean(dayData.isAvailable),
        timeWindows: Array.isArray(dayData.timeWindows)
          ? dayData.timeWindows.map(parseTimeWindow)
          : []
      };
    });

    return parsedAvailability;
  } catch (error) {
    console.error('Error parsing availability:', error);
    // Return default availability if parsing fails
    return {
      monday: { isAvailable: false, timeWindows: [] },
      tuesday: { isAvailable: false, timeWindows: [] },
      wednesday: { isAvailable: false, timeWindows: [] },
      thursday: { isAvailable: false, timeWindows: [] },
      friday: { isAvailable: false, timeWindows: [] },
      saturday: { isAvailable: false, timeWindows: [] },
      sunday: { isAvailable: false, timeWindows: [] }
    };
  }
};

export const parseProviderData = (provider: any): ServiceProvider => {
  return {
    ...provider,
    availability: parseAvailability(provider.availability),
    socialLinks: typeof provider.socialLinks === 'string'
      ? [JSON.parse(provider.socialLinks) as SocialLink]
      : provider.socialLinks || [],
    reviewList: Array.isArray(provider.reviewList)
      ? provider.reviewList.map((review: string | Review) => 
          typeof review === 'string' ? JSON.parse(review) as Review : review
        )
      : [],
    licenseInfo: typeof provider.licenseInfo === 'string'
      ? JSON.parse(provider.licenseInfo) as LicenseInfo
      : provider.licenseInfo
  };
};
