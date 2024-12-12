<template>
    <Modal1 size="lg" :show="showSqOffModal" @close ="closeModel">
        <template #header>
            <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl">
                Position SqOff Confirmation
            </div>
        </template>

        <template #body>
            <div class="p-5">
                <div class="input-form mb-2 ">
                    <label for="exchange" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Exchange : {{ brokerPosSqOffData.exchange }}</span>
                    </label>
                    <label for="tradingsymbol" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Trading Symbol : {{ brokerPosSqOffData.tradingsymbol }}</span>
                    </label>
                    <label for="instrument_token" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Instrument Token : {{ brokerPosSqOffData.instrument_token }}</span>
                    </label>
                    <label for="transaction_type" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Transaction Type : {{ brokerPosSqOffData.transaction_type }}</span>
                    </label>
                    <label for="quantity" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Quantity : {{ brokerPosSqOffData.quantity }}</span>
                    </label>
                    <label for="product" class="form-label w-full flex flex-col sm:flex-row">
                        <span class="font-medium">Product :
                            <span v-if="brokerPosSqOffData.product=='I'">Intraday</span>
                            <span v-else-if="brokerPosSqOffData.product=='D'">Delivery </span>
                            <span v-else-if="brokerPosSqOffData.product=='M'">Margin </span>
                            <span v-else>{{ brokerPosSqOffData.product }}</span> 
                        </span>
                    </label>
        

                </div>

                <div class="px-5 py-3 text-center">
                    <button type="button" @click="closeModel" class="btn-close">
                        Cancel
                    </button>

                    <button type="button"  @click="submitRequest" class="btn-danger">
                        Confirm
                    </button>
                </div>

            </div>
        </template>

    </Modal1>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { useBrokersStore } from '@/stores/matrix/broker'
import { makeRequest } from "@/request/request";

// const showValue = ref(true)
const brokersStore = useBrokersStore();

const { showSqOffModal,brokerPosSqOffData, storedBrokerData } = storeToRefs(brokersStore)
const { showOrdersview } = brokersStore

// const { sqOffPosition } = brokersStore

function closeModel() {
    showSqOffModal.value = false;
}

const submitRequest = async () => {
    let formData = brokerPosSqOffData.value
    try {
    await makeRequest("brokerOrder", "POST", formData, {}, {}, 0);
    
    showOrdersview(storedBrokerData.value)
    showSqOffModal.value = false;
} catch (error) {
            console.error('Error in sqoff brokers position:', error);
            throw error;
        }
    
    // brokerPosSqOffData.value.broker_id = broker.broker_id
    // brokerPosSqOffData.value.user_id = broker.user_id
    // brokerPosSqOffData.value.broker_userid = broker.broker_userid
    // brokerPosSqOffData.value.broker_token = broker.broker_token
    // brokerPosSqOffData.value.broker_api = broker.broker_api
    // brokerPosSqOffData.value.broker_api_secret = broker.broker_api_secret
    // brokerPosSqOffData.value.broker_name = broker.broker_name

    
}

</script>