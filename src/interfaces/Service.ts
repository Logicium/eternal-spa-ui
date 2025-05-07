import type { Package } from './Package';

export interface Service {
  id: string;
  name: string;
  image?: string;
  desc?: string;
  price?: number;
  duration?: number;
  vendorId?: string;
  packages?: Package[];
}
