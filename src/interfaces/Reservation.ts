import type { Service } from './Service';
import type { Package } from './Package';

export interface Reservation {
  id: string;
  name: string;
  service?: Service;
  package?: Package;
  timeStart: string;
  timeEnd: string;
  totalDuration: string;
  totalPrice: number;
  receiptUrl?: string;
  confirmed: boolean;
  vendorId?: string;
  guestId?: string;
  orderId?: string;
}
