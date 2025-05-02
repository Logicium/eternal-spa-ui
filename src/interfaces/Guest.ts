import type { Reservation } from './Reservation';

export interface Guest {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  rewardsPoints?: number;
  reservations?: Reservation[];
}
