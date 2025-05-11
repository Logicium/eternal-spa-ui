export interface Opening {
  id: string;
  serviceType: string;
  serviceId: string;
  vendorId: string;
  timeStart: string | Date;
  timeEnd: string | Date;
  isSeries?: boolean;
  repeatWeeks?: number;
  type?: string;
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
