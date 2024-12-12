<template>
  <div class="intro-x dark:text-white box shadow col-span-12 lg:col-span-6">
    <div class="flex items-center px-5 py-5 sm:py-3 border-b shadow dark:border-darkmode-400">
      <h2 class="font-medium text-base mr-auto">Billing</h2>
      <button @click="showEdit" class="btn btn-primary shadow-md mr-2">Create Invoice</button>
      <createInvoiceModal/>
      <invoiceReceiptModal/>
    </div>
    <div class="p-5 overflow-y-auto ">
      <template v-if="invoices.length > 0">
        <div v-for="(invoice, i) in invoices" :key="i">
          <div class="relative flex items-center" :class="{'mt-5': i > 0}">
            <FilesIcon class=" w-8 h-8 " />
            <div class="ml-4 mr-auto">
              <span class="font-medium">Due Date: {{ invoice.due_date.replace("T"," ").replace("Z","") }} </span>
              <div class="text-slate-500 mr-5 sm:mr-5">
                Status: {{ invoice.payment_status }}
              </div>
            </div>
            <!-- <div class="font-medium text-slate-600 dark:text-slate-500">{{ invoice.payable_amount }}</div> -->
            <!-- <div class="mr-5"> -->
              <Tippy @click="showInvoice(invoice)" class="tooltip" content="View Invoice!">
                <EyeIcon class="block  w-5 cursor-pointer" />
            </Tippy>
            <!-- </div> -->
            

              <a class="flex items-center ml-3 "  @click="showPaymentProof(invoice)" href="javascript:;">
                    <UploadIcon class="w-4 h-4 mr-1" /> Add Payment Proof
                </a>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center">
          Record not found!!
        </div>
        
      </template>
      
    </div>
  </div>
    
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInvoicesStore } from "@/stores/matrix/invoice";
  import createInvoiceModal from "./createInvoiceModal.vue";
  import invoiceReceiptModal from "./invoiceReceiptModal.vue";

import { storeToRefs } from "pinia";



const invoiceStore = useInvoicesStore();

const { showAddEditModal, showInvoiceReceiptModal,invoiceData,addEditInvoiceData } = storeToRefs(invoiceStore)



const invoices = computed<any>(() => Object.values(invoiceStore.invoices));

function showInvoice(invoice: any) {
    invoiceData.value = invoice
    showInvoiceReceiptModal.value = true;
}


function showPaymentProof(invoice: any) {
    addEditInvoiceData.value = invoice
    showAddEditModal.value = true;
}

function showEdit() {
  addEditInvoiceData.value = {}
    showAddEditModal.value = true;
}

</script>

<style lang="scss" scoped>
.intro-x {
  @apply border rounded bg-third dark:bg-primary dark:border-none;
}
</style>

