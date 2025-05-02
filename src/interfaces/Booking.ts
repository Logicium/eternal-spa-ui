export interface Booking{
  id: string;
  service:string;
  serviceType: string;
  vendorId: string;
  timeStart: string;
  timeEnd: string;
  selected?: boolean;
}
