import {defineStore} from "pinia";
import {useFetch, useStorage} from "@vueuse/core";
import api from "@/router/api";
import type { Service } from "@/interfaces";

export const useServicesStore = defineStore({
  id:"ServicesStore",
  state:()=>{
    return {
      services: useStorage('services',null) as Service[] | null
    };
  },
  actions:{
    async fill(){
      const {isFetching,data} = await useFetch(api.services.list).json();
      this.services = (await data);
    }
  }
})
