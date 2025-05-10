import type { Service } from './Service';
import type { Opening } from './Opening';
import type { Reservation } from './Reservation';

export interface Vendor {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  bio?: string;
  profileImage?: string;
  services?: Service[];
  openings?: Opening[];
  timeOff?: Opening[];
  reservations?: Reservation[];
}
