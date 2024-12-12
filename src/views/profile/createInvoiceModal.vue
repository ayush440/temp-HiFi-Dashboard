<template>
    <Modal1 size="xl" :show="showAddEditModal" @close="closeModel">
        <template #header>
            <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl">
                {{ invoice.id ? `Upload Payment Proof` : `ADD INVOICE` }}
            </div>
        </template>

        <template #body>

            <form class=" p-4 pt-0" @submit.prevent="save(invoice.id)">
                <div v-if="!invoice.id" class="input-form">
                    <label for="plan_id" class="form-label w-full flex flex-col sm:flex-row">
                        Select Plan
                    </label>
                    <SingleSelect v-if="plans.length" v-model.trim="invoiceFormData.plan_id"
                        placeholder="Select a plan" inputColor="bg-white text-gray-600" >
                        <option v-for="plan in plans" :key="plan.id" :value="plan.id"> {{ plan.name }} </option>
                    </SingleSelect>
                </div>

                <div v-if="!invoice.id" class="input-form mt-3">
                    <label for="promo_code" class="form-label w-full flex flex-col sm:flex-row">
                        Add Gift Card or Promo Code
                    </label>
                    <div>
                        <div class="relative flex items-center">
                            <input type="text" id="promo_code" v-model.trim="invoiceFormData.promo_code"
                                class="block w-full p-2 pe-20 text-sm text-white border border-gray-300 rounded-lg"
                                placeholder="Enter Promo Code" />
                            <a @click="getOfferByPromo" id="input-group-2"
                                v-bind:class="{ 'opacity-50 dark:opacity-85 pointer-events-none': !invoiceFormData.plan_id }"
                                class="px-5 absolute right-1 font-medium text-black dark:text-white border border-black dark:border-white rounded-lg  cursor-pointer hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300">
                                Apply
                            </a>
                        </div>
                    </div>

                    <template v-if="promoError">
                        <div class="text-danger mt-2">
                            {{ promoError }}
                        </div>
                    </template>
                </div>

                <div class="input-form mt-3">
                    <label for="qr_code" class="form-label w-full flex flex-col sm:flex-row">
                        Add Payment Proof
                    </label>
                    
                    <!-- <input
                        class="block w-full text-sm text-white border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="image" type="file" accept="image/*" @change="handleInvoiceFileChange" /> -->
                        <input @change="handleInvoiceFileChange" type="file" accept="image/png, image/jpeg, image/jpg" class="text-sm file:py-2 file:px-10 file:border p-0 block w-full file:text-gray-500  text-gray-500 border border-black rounded-lg file:cursor-pointer cursor-pointer file:bg-gray-100 bg-gray-100 focus:outline-none" id="image">
                </div>

                <div class="input-form mt-3">
                    <template v-if="!invoice.id">
                        <label for="qr_code" class="form-label w-full flex flex-col sm:flex-row">
                            QR Code 
                        </label>
                        <div class="w-25 h-25 sm:w-24 sm:h-24 flex-none lg:w-40 lg:h-40 image-fit relative">
                            <img :src="`/images/admin/qrcode/${invoiceConfigrations?.qr_code_url}`" alt="QR Code">
                        </div>



                        <div class="mt-12 text-right">
                            <label for="broker_api_secreat" class="form-label w-full flex flex-col">
                                Total Amount: {{ calculatedTotalAmount ? calculatedTotalAmount : 0 }}

                            </label>
                            <label for="broker_api_secreat" class="form-label w-full flex flex-col">
                                Discount: {{ invoiceFormData.discount_amount ? "-" + invoiceFormData.discount_amount : 0
                                }}

                            </label>
                            <label for="broker_api_secreat" class="form-label w-full flex flex-col">
                                Payable Amount:{{ invoiceFormData.payable_amount ? "= " + invoiceFormData.payable_amount
        : 0
                                }}

                            </label>

                        </div>

                    </template>

                    <div class="mt-5 text-right">
                        <button type="button" @click="closeModel" class="btn-close">
                            Cancel
                        </button>
                        <button v-if="!invoice.id" type="submit" @click="submitForm"
                            v-bind:class="{ 'opacity-50 pointer-events-none': !invoiceFormData.payable_amount }"
                            class="btn-submit">Submit</button>

                        <button v-else type="submit" @click="submitForm" class="btn-submit">Submit</button>

                    </div>
                </div>
            </form>
        </template>
    </Modal1>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useInvoicesStore } from "@/stores/matrix/invoice";
import { useInvoiceConfigrationStore } from '@/stores/matrix/invoiceConfigration';
import { useStrategiesStore } from "@/stores/matrix/strategy";
import { storeToRefs } from "pinia";


import { makeRequest } from "@/request/request"; // Import your makeRequest function

const invoiceStore = useInvoicesStore();
const invoiceConfigrationStore = useInvoiceConfigrationStore();

const { invoiceConfigrations } = storeToRefs(invoiceConfigrationStore);
const { showAddEditModal, addEditInvoiceData } = storeToRefs(invoiceStore);


const strategiesStore = useStrategiesStore();

const { plans } = storeToRefs(strategiesStore);


const dropdownOptions = computed<any>(() => {
    let temp = strategiesStore.plans || []
    if (temp.length > 0) {
        return temp.map((plan: any) => {
            return {
                id: plan.id,
                label: `${plan.name}`,
            };
        });
    }
    return []
})


function closeModel() {
    showAddEditModal.value = false;
}

const submitForm = async () => {

}


let promoError = ref("");


let discount_percent = ref(0);


let invoiceFormData = reactive<any>({
    plan_id: 0,
    plan_name: "",
    promo_code: "",
    offer_id: "",
    image: null,
    items: [],
    payable_amount: 0,
    discount_amount: 0,
    total_amount: 0
});



const invoice = computed<any>(() => {
    const invoice = addEditInvoiceData.value
    return invoice
})

// watchEffect(() => {

//     console.log("print data",invoiceFormData.plan_id,invoiceFormData.promo_code);
//     console.log("print img",invoiceFormData.image);
// })
let offerType = ref("");


const getOfferByPromo = async () => {
    promoError.value = "";

    let offers = await makeRequest("getOfferByPromo", "POST", { "plan_id": Number(invoiceFormData.plan_id), "offer_uuid": invoiceFormData.promo_code }, {}, {}, 0);


    if (!offers) {
        promoError.value = "Invalid Promo Code!";
    } else {
        offerType.value = offers.data.offer_type;

        discount_percent.value = offers.data.offer.discount_percent;
        invoiceFormData.discount_amount = offers.data.offer.discount_amount;
        invoiceFormData.offer_id = offers.data.offer.id;
    }
}



const calculatedTotalAmount = computed(() => {

    const selectedPlan = plans.value.find((plan: any) => plan.id === Number(invoiceFormData.plan_id)) || {};

    if (selectedPlan.invoice_item) {
        // Extract invoice_item IDs from the selected plan
        let invoiceItemIds = selectedPlan.invoice_item.map((item: any) => item.id);

        // Convert the IDs to strings if needed
        invoiceFormData.items = invoiceItemIds

        // Calculate the total amount by summing up all invoice_item amounts
        const totalAmount = selectedPlan.invoice_item.reduce((sum: number, item: any) => sum + item.amount, 0);

        invoiceFormData.total_amount = totalAmount


        if (invoiceFormData.discount_amount > 0) {
            invoiceFormData.payable_amount = totalAmount - invoiceFormData.discount_amount;
            return totalAmount
        } else if (discount_percent.value > 0) {
            invoiceFormData.discount_amount = (discount_percent.value / 100) * totalAmount;
            invoiceFormData.payable_amount = totalAmount - invoiceFormData.discount_amount
            return totalAmount
        } else {
            invoiceFormData.payable_amount = totalAmount;
            invoiceFormData.discount_amount = 0
            return totalAmount
        }



    } else {
        resetInvoiceFormData()
        return 0;
    }

});





const initialInvoiceFormData: any = {
    plan_id: 0,
    plan_name: "",
    promo_code: "",
    offer_id: "",
    image: null,
    items: [],
    payable_amount: 0,
    discount_amount: 0,
    total_amount: 0
};

// Create a function to reset the form data
function resetInvoiceFormData() {
    for (const key in initialInvoiceFormData) {
        invoiceFormData[key] = initialInvoiceFormData[key];

    }
}


const handleInvoiceFileChange = (event: any) => {
    const file = event.target.files[0];
    invoiceFormData.image = file;
};

const save = async (id: number) => {

    const formData = new FormData();
    let offerId = invoiceFormData.offer_id ? invoiceFormData.offer_id : 0

    formData.append('total_amount', invoiceFormData.total_amount);
    formData.append('items', invoiceFormData.items.join(','));
    formData.append('offer_type', offerType.value);
    formData.append('offer_discount', invoiceFormData.discount_amount);
    formData.append('payable_amount', invoiceFormData.payable_amount);
    formData.append('image', invoiceFormData.image);
    formData.append('offer_id', offerId);
    formData.append('plan_id', invoiceFormData.plan_id);




    try {
        if (id > 0) {
            await makeRequest("invoices", "PUT", formData, {}, {}, 0, id);
        } else {
            await makeRequest("invoices", "POST", formData, {}, {}, 0);
        }

        resetInvoiceFormData();
        invoiceFormData.plan_id = 0
        invoiceFormData.image = null
        closeModel();
    } catch (error) {
    }
};



</script>