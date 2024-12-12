import { ref } from 'vue';
import { defineStore } from 'pinia';
import { makeRequest } from "@/request/request";
export const useNotificationsStore = defineStore('notifications', () => {
    const endpoint = 'notifications';
    const wait = 0
    const notificationsData = ref<any>([]);


    // function updateNotifications() {
    //     try {
            
    //             notificationsData.value = response.data;
          
    //         let notificationsval = [
    //             {
    //                 id: 1,
    //                 time: "12:20 PM",
    //                 heading: "New Order",
    //                 message: "New order alert in Matrix hunter"
    //             },
    //             {
    //                 id: 2,
    //                 time: "12:20 PM",
    //                 heading: "New Order",
    //                 message: "New order alert in Matrix hunter"
    //             },
    //             {
    //                 id: 3,
    //                 time: "12:20 PM",
    //                 heading: "New Order",
    //                 message: "New order alert in Matrix hunter"
    //             },
    //             {
    //                 id: 4,
    //                 time: "12:20 PM",
    //                 heading: "New Order",
    //                 message: "New order alert in Matrix hunter"
    //             },
    //             {
    //                 id: 5,
    //                 time: "12:20 PM",
    //                 heading: "New Order",
    //                 message: "New order alert in Matrix hunter"
    //             }
    //         ]
    //         notificationsData.value = notificationsval

    //     } catch (error) {
            

    //         console.error('Error fetching notification:', error);
    //         throw error;
    //     }
    // }
   

    return {
        endpoint,
        wait,
        notificationsData
    };
});
