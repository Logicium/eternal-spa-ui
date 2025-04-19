import {defineStore} from "pinia";
import {useFetch, useStorage} from "@vueuse/core";
export const useAuthStore = defineStore({
    id:"AuthStore",
    state:()=>{
        return {
            token: useStorage('auth',null)
        };
    }
})