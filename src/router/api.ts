const baseUrl = 'http://localhost:3000';
const cmsUrl = 'http://localhost:1337'

const api = {
  services:{
    list: baseUrl+'/services/list'
  },
  bookings: baseUrl+'/bookings',
  reservations:baseUrl+'/reservation',
  payment:{
    checkout:baseUrl+'/payment/checkout'
  },
  guest:{
    account:baseUrl+'/guest/account',
    login:baseUrl+'/guest/login',
    signup:baseUrl+'/guest/signup',
    settings:baseUrl+'/guest/settings',
    password:baseUrl+'/guest/password'
  },
  vendor:{
    account:baseUrl+'/vendor/account',
    login:baseUrl+'/vendor/login',
    openings:baseUrl+'/vendor/openings',
    timeoff:baseUrl+'/vendor/timeoff',
    settings:baseUrl+'/vendor/settings',
    reservations:baseUrl+'/vendor/reservations',
  },
  email:{
    contact:baseUrl+'/email/contact'
  },
  about_page:cmsUrl+'/api/about',
  podcasts:cmsUrl+'/api/podcasts',
  podcast: (documentId: string) => `${cmsUrl}/api/podcasts/${documentId}`
}
export default api
