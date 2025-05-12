import type { Reservation } from './Reservation';
import type { Reward } from './Reward';

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
  rewards?: Reward[];
}
