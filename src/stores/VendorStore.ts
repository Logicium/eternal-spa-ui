import {defineStore} from "pinia";
import {createFetch, type RemovableRef, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
import router from "../router";
import type { Vendor } from "@/interfaces";

interface VendorStore {
  vendor: RemovableRef<Vendor | null>;
}

export const useVendorStore = defineStore({
  id:"VendorStore",
  state:():VendorStore=>{
    return {
      vendor: useStorage('vendor', null)
    };
  },
  actions:{
    async fill(token:string|null){
      try {
        const fetchUser = createFetch({
          options: {
            async beforeFetch({ options }) {
              options.headers.Authorization = `Bearer ${token}`
              return { options }
            },
          }
        })
        const {isFetching,data,error} = await fetchUser(api.vendor.account).json();

        // Set vendor data
        this.vendor = (await data.value);

        // If vendor data is null or undefined, redirect to login
        if (!this.vendor) {
          router.push('/login');
          return null;
        }

        return this.vendor;
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        this.vendor = null;
        router.push('/login');
        return null;
      }
    }
  }

})
