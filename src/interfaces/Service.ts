import type { Package } from './Package';

export interface Service {
  id: number | string;
  name: string;
  description?: string;
  price?: number;
  duration?: number;
  vendorId?: string;
  packages?: Package[];
}
