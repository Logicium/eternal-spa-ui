import {defineStore} from "pinia";
import {createFetch, type RemovableRef, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
import type { Guest } from "@/interfaces";
import router from "@/router";

interface AccountStore {
  guest: RemovableRef<Guest | null>;
}

export const useAccountStore = defineStore({
    id:"AccountStore",
    state:():AccountStore=>{
        return {
            guest: useStorage('guest', null)
        };
    },
    actions:{
        async fill(token:string) {
          try{
            const fetchUser = createFetch({
              options: {
                async beforeFetch({options}) {
                  const headers = new Headers(options.headers);
                  headers.set('Authorization', `Bearer ${token}`);
                  options.headers = headers;
                  return {options}
                },
              }
            })
            const {isFetching, data} = await fetchUser(api.guest.account).json();
            this.guest = (await data.value);
            // If vendor data is null or undefined, redirect to login
            if (!this.guest) {
              router.push('/login');
              return null;
            }
            return this.guest;
        } catch (error) {
            console.error("Error fetching guest data:", error);
            this.guest = null;
            router.push('/login');
            return null;
          }
        }
    }

})
