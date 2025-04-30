export interface Package {
  id: number | string;
  name: string;
  description?: string;
  price?: number;
  duration?: number;
  serviceId?: number | string;
}

// Import this interface in files that use Package objects
