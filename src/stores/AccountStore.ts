import {defineStore} from "pinia";
import {createFetch, useFetch, useLocalStorage, useStorage} from "@vueuse/core";
import api from "../router/api";
export const useAccountStore = defineStore({
    id:"AccountStore",
    state:()=>{
        return {
            guest: useStorage('guest', {})
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
            const {isFetching,data} = await fetchUser(api.auth.account).json();
            return this.guest = (await data);
            //console.log(this.user);
        }
    }

})
