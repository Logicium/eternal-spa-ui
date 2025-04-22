const baseUrl = 'http://localhost:3000';
const cmsUrl = 'http://localhost:1337'
// const baseUrl = 'https://flora-6tzn.onrender.com';

const api = {
  services:baseUrl+'/service',
  reservations:baseUrl+'/reservation',
  order:{
    sessionStatus:baseUrl+'/order/session-status',
    checkout:baseUrl+'/order/create-checkout-session'
  },
  auth:{
    account:baseUrl+'/auth/account',
    login:baseUrl+'/auth/login',
    signup:baseUrl+'/auth/signup'
  },
  email:{
    contact:baseUrl+'/email/contact'
  },
  about_page:cmsUrl+'/api/about'
}
export default api
