import {defineStore} from "pinia";
import {createFetch, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
import type { Guest } from "@/interfaces";

export const useAccountStore = defineStore({
    id:"AccountStore",
    state:()=>{
        return {
            guest: useStorage('guest', {}) as Guest
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
            const {isFetching,data} = await fetchUser(api.guest.account).json();
            return this.guest = (await data);
            //console.log(this.user);
        }
    }

})
