export interface Opening {
  id: number | string;
  serviceType: string;
  serviceId: number | string;
  vendorId: string;
  timeStart: string;
  timeEnd: string;
  isSeries?: boolean;
  repeatWeeks?: number;
  selectedDays?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

// Import this interface in files that use Opening objects
