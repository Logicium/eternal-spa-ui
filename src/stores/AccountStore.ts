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
                        options.headers.Authorization = `Bearer ${token}`
                        return { options }
                    },
                }
            })
            const {isFetching,data} = await fetchUser(api.guest.account).json();
            return this.guest = (await data.value);
            //console.log(this.user);
        },
        updateGuestProperty(property: keyof Guest, value: any) {
            if (this.guest) {
                // Create a new object with the updated property
                const updatedGuest = { ...this.guest, [property]: value };
                // Assign the updated object back to this.guest
                this.guest = updatedGuest;
            }
        },

        // Update multiple guest properties at once
        updateGuestForm(formData: Partial<Guest>) {
            if (this.guest) {
                // Create a new object with the updated properties
                const updatedGuest = { ...this.guest, ...formData };
                // Assign the updated object back to this.guest
                this.guest = updatedGuest;
            }
        }
    }

})
