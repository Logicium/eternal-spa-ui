import {defineStore} from "pinia";
import {createFetch, type RemovableRef, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
import type { Guest } from "@/interfaces";

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
        async fill(token:string){
            const fetchUser = createFetch({
                options: {
                    async beforeFetch({ options }) {
                        const headers = new Headers(options.headers);
                        headers.set('Authorization', `Bearer ${token}`);
                        options.headers = headers;
                        return { options }
                    },
                }
            })
            const {isFetching,data} = await fetchUser(api.guest.account).json();
            return this.guest = (await data.value);
            //console.log(this.user);
        }
    }

})
