import type { Guest } from './Guest';
import type { Reservation } from './Reservation';

export interface Reward {
  id: string;
  guest: Guest;
  points: number;
  reservation?: Reservation;
  redeemed: boolean;
  dateAdded: Date;
}
