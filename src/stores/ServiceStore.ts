import {defineStore} from "pinia";
import {useFetch, useStorage} from "@vueuse/core";
import api from "@/router/api";
import type { Service } from '@/interfaces/Service';
import type {RemovableRef} from "@vueuse/core";

interface ServicesStore {
  services: RemovableRef<Service[] | null>
}

export const useServicesStore = defineStore({
  id:"ServicesStore",
  state:():ServicesStore=>{
    return {
      services: useStorage('services',null)
    };
  },
  actions:{
    async fill(){
      const {isFetching,data} = await useFetch(api.services.list).json();
      this.services = (await data.value);
    }
  }
})
