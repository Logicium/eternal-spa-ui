import {defineStore} from "pinia";
import {createFetch, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
export const useVendorStore = defineStore({
  id:"VendorStore",
  state:()=>{
    return {
      guest: useStorage('vendor', {})
    };
  },
  actions:{
    async fill(token:string){
      const fetchUser = createFetch({
        options: {
          async beforeFetch({ options }) {
            options.headers.Authorization = `Bearer ${token}`
            return { options }
          },
        }
      })
      const {isFetching,data} = await fetchUser(api.vendor.account).json();
      return this.guest = (await data);
      //console.log(this.user);
    }
  }

})
