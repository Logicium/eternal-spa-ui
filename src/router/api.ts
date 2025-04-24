const baseUrl = 'http://localhost:3000';
const cmsUrl = 'http://localhost:1337'
// const baseUrl = 'https://flora-6tzn.onrender.com';

const api = {
  services:{
    list: baseUrl+'/services/list'
  },
  reservations:baseUrl+'/reservation',
  order:{
    sessionStatus:baseUrl+'/order/session-status',
    checkout:baseUrl+'/order/create-checkout-session'
  },
  guest:{
    account:baseUrl+'/guest/account',
    login:baseUrl+'/guest/login',
    signup:baseUrl+'/guest/signup'
  },
  vendor:{
    account:baseUrl+'/vendor/account',
    login:baseUrl+'/vendor/login',
  },
  email:{
    contact:baseUrl+'/email/contact'
  },
  about_page:cmsUrl+'/api/about'
}
export default api
