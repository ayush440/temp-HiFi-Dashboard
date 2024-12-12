<template>
  <Modal1 size="2xl" :show="showInvoiceReceiptModal" @close="closeModel"
  >
    <template #header>
        <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl">
          Invoice Receipt
        </div>
    </template>

    <template #body>
        <div v-if="invoiceData" ref="contentToConvert" id="invoice-modal" class="intro-y box overflow-auto">
          <div class="flex flex-col items-center lg:flex-row pt-10 px-5  lg:pb-10 text-center sm:text-left"  >
            <div class="font-semibold text-tableText  text-3xl">
              INVOICE 
              <br/>
            </div>
            
            <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
              <a v-if="invoiceConfigration" class="flex justify-center items-center min-h-12 bg-secondary-light px-1 logo-lg rounded-md w-fit shadow cursor-pointer" href="/" alt ="logo">
                <logoComp />
              </a>
              <span class="text-base text-tableText font-normal" v-if="invoiceConfigration.gst_number">GSTIN: {{  invoiceConfigration.gst_number }}</span>

            </div>
          </div>
        
          <div
            class="flex flex-col lg:flex-row border-b border-tableText px-5  pt-10 pb-10  text-center sm:text-left"
          >
            <div class="text-tableText">
              <div class="text-base text-tableText  ">Client Details</div>
              <div class="text-lg font-medium mt-2 capitalize">
                {{ profile.name }}
              </div>
              <div class="mt-1 ">{{ profile.email }}</div>
              <div class="mt-1">{{ profile.address_1 ? profile.address_1 + ', ' + profile.state + ' ' + profile.pincode : '' }}</div>
              <div class="mt-1"><span class="text-base font-normal" v-if="invoiceData.gst_number">GSTIN: {{  invoiceData.gst_number }}</span></div>
            </div>
            <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
              <div class="text-lg text-tableText  font-medium mt-2">RECEIPT CREATED AT</div>
              <div class="mt-1"> 
                {{  invoiceData.created_at? invoiceData.created_at.replace("T"," ").replace("Z",""): '' }}
              </div>
            </div>
          </div>
          <div class="px-5 py-10 text-tableText">
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                      DESCRIPTION
                    </th>
                    <th
                      class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                    >
                      QTY
                    </th>
                    <th
                      class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                    >
                      PRICE
                    </th>
                    <th
                      class="border-b-2 px-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                    >
                      SUBTOTAL
                    </th>
                  </tr>
                </thead>
                <tbody  >

                  <invoiceReceiptRow v-if="invoiceData.invoice_items" v-for="(invoiceItem, i) in invoiceData.invoice_items" :key="i"
                          :item="invoiceItem" /> 

                    <tr class ="border-t-4 border-tableText">
                      <td class="border-b px-2 dark:border-darkmode-400">
                        <div class="font-medium whitespace-nowrap">
                            Calculated Amount
                        </div>
                        <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                            
                        </div>
                      </td>
                      <td class="text-right border-b dark:border-darkmode-400 w-32">

                      </td>
                      <td class="text-right border-b dark:border-darkmode-400 w-32">
                      
                      </td>
                      <td
                        class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium"
                        >
                        {{`Rs. ${invoiceData.total_amount}`}}
                      </td>
                  </tr>
                  <tr>
                    <td class="border-b px-2 dark:border-darkmode-400">
                          <div class="font-medium whitespace-nowrap">
                              Discount
                          </div>
                          <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                              
                          </div>
                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">

                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">
                          
                          </td>
                          <td
                          class="text-right  px-2 border-b dark:border-darkmode-400 w-32 font-medium"
                          >
                          {{ `- ${invoiceData.offer_discount}` }}
                      </td>
                  </tr>
                  <tr>
                    <td class="border-b px-2 dark:border-darkmode-400">
                          <div class="font-medium whitespace-nowrap">
                              Amount After Discount
                          </div>
                          <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                              
                          </div>
                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">

                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">
                          
                          </td>
                          <td
                          class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                          >
                          {{ `Rs. ${invoiceData.payable_amount}` }}
                      </td>
                  </tr>
                  <tr>
                    <td class="border-b px-2 dark:border-darkmode-400">
                          <div class="font-medium whitespace-nowrap">
                              GST(18%)
                          </div>
                          <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                              
                          </div>
                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">

                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">
                          
                          </td>
                          <td
                          class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                          >
                        + {{ calculateGst() }}
                      </td>
                  </tr>
                  <tr>
                    <td class="border-b px-2 dark:border-darkmode-400">
                          <div class="font-medium whitespace-nowrap">
                              Payable Amount
                          </div>
                          <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                              
                          </div>
                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">

                          </td>
                          <td class="text-right border-b dark:border-darkmode-400 w-32">
                          
                          </td>
                          <td
                          class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                          >
                        {{ `Rs. ${totalAmount.toFixed(2)}` }}
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="px-5 pb-10 flex flex-col-reverse sm:flex-row text-tableText">
            <div class="text-center sm:text-right sm:ml-auto ">
              <div class="text-base  ">Total Payable Amount</div>
              <div class="text-xl  font-medium mt-2">{{`Rs. ${totalAmount.toFixed(2)}`}}</div>
              <div class="mt-1">Taxes included</div>
            </div>
          </div>


          <!-- CONTACT US  -->
        <div class="border-b border-tableText relative mt-2 pb-6 text-tableText">
          <div v-if="invoiceConfigration.contact_number || invoiceConfigration.email || invoiceConfigration.address" class="font-bold text-lg text-tableText ml-1 mb-1 px-2">CONTACT US</div>
            <div class="flex px-2">
                <div v-if="invoiceConfigration.contact_number" class="flex items-center text-xs font-medium">
                    <div class=" ml-1 mr-2 p-1 rounded-full"><SmartphoneIcon class="w-4 h-4 " /></div><a href="javascript:void(0)"> {{ invoiceConfigration.contact_number }}</a> 
                </div>
                <div v-if="invoiceConfigration.email" class="flex items-center ml-4 text-xs font-medium">
                    <div class=" ml-1 mr-2 p-1 rounded-full"><GlobeIcon class="w-4 h-4 " /></div><a href="javascript:void(0)">{{ invoiceConfigration.email }}</a> 
                </div>
            </div>
            <div v-if="invoiceConfigration.address" class="flex flex-wrap items-center mt-1 px-2 text-xs font-medium">
                <div class=" ml-1 mr-2 p-1 rounded-full"><MapIcon class="w-4 h-4 " /></div>
                <a href="javascript:void(0)" class="w-56"> {{ invoiceConfigration.address }}
                </a> 
            </div>
        </div>

          <div class="flex justify-end mt-1">
              <button class="btn-close" @click="closeModel">Back</button>
              <button type="button" @click="onclicked" class="flex items-center btn-submit">  
                <DownloadIcon class="w-4 h-4 mx-1" /> Download
            </button>
          </div>
          
        </div>
    </template>
  </Modal1>


  <!-- for download use -->
  <div v-if="invoiceData" ref="contentToConvert" id="invoice-modal2" class="hidden bg-third-light text-tableText min-w-[600px] max-w-[610px] box">
    <div class="flex flex-row px-5 py-5 text-left"  >
      <div class="font-semibold text-tableText  text-3xl">
        INVOICE 
      </div>
      
      <div class="mt-0 ml-auto text-right">
        <a v-if="invoiceConfigration" class="flex justify-center items-center min-h-12 bg-secondary-light px-1 logo-lg rounded-md w-fit shadow cursor-pointer" href="/" alt ="logo">
          <logoComp />
        </a>
        <span class="text-base text-tableText font-normal" v-if="invoiceConfigration.gst_number">GSTIN: {{  invoiceConfigration.gst_number }}</span>
      </div>
    </div>
  
    <div
      class="flex flex-row text-tableText border-b px-5  pt-10 pb-10 text-left"
    >
      <div>
        <div class="text-base text-tableText  ">Client Details</div>
        <div class="text-lg font-medium mt-2 capitalize">
          {{ profile.name }}
        </div>
        <div class="mt-1 ">{{ profile.email }}</div>
        <div class="mt-1">{{ profile.address_1 ? profile.address_1 + ', ' + profile.state + ' ' + profile.pincode : '' }}</div>
        <div class="mt-1"><span class="text-base font-normal" v-if="invoiceData.gst_number">GSTIN: {{  invoiceData.gst_number }}</span></div>
      </div>
      <div class="mt-0 ml-auto text-right">
        <div class="text-lg text-tableText  font-medium mt-2">RECEIPT CREATED AT</div>
        <div class="mt-1"> 
          {{  invoiceData.created_at? invoiceData.created_at.replace("T"," ").replace("Z",""): '' }}
        </div>
      </div>
    </div>
    <div class="px-5 py-10">
      <div class="">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                DESCRIPTION
              </th>
              <th
                class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
              >
                QTY
              </th>
              <th
                class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
              >
                PRICE
              </th>
              <th
                class="border-b-2 px-2 dark:border-darkmode-400 text-right whitespace-nowrap"
              >
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody  >

            <invoiceReceiptRow v-if="invoiceData.invoice_items" v-for="(invoiceItem, i) in invoiceData.invoice_items" :key="i"
                    :item="invoiceItem" /> 

              <tr class ="border-t-4 ">
                <td class="border-b px-2 dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                        Calculated Amount
                    </div>
                    <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                        
                    </div>
                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">

                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">
                    
                    </td>
                    <td
                    class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium"
                    >
                    {{`Rs. ${invoiceData.total_amount}`}}
                </td>
            </tr>
            <tr>
              <td class="border-b px-2 dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                        Discount
                    </div>
                    <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                        
                    </div>
                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">

                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">
                    
                    </td>
                    <td
                    class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium"
                    >
                    {{ `- ${invoiceData.offer_discount}` }}
                </td>
            </tr>
            <tr>
              <td class="border-b px-2 dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                        Amount After Discount
                    </div>
                    <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                        
                    </div>
                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">

                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">
                    
                    </td>
                    <td
                    class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                    >
                    {{ `Rs. ${invoiceData.payable_amount}` }}
                </td>
            </tr>
            <tr>
              <td class="border-b px-2 dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                        GST(18%)
                    </div>
                    <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                        
                    </div>
                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">

                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">
                    
                    </td>
                    <td
                    class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                    >
                  + {{ calculateGst() }}
                </td>
            </tr>
            <tr>
              <td class="border-b px-2 dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                        Payable Amount
                    </div>
                    <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                        
                    </div>
                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">

                    </td>
                    <td class="text-right border-b dark:border-darkmode-400 w-32">
                    
                    </td>
                    <td
                    class="text-right px-2 border-b dark:border-darkmode-400 w-32 font-medium text-nowrap"
                    >
                  {{ `Rs. ${totalAmount.toFixed(2)}` }}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5 pb-10 flex flex-row">
      <div class="text-right ml-auto ">
        <div class="text-base text-tableText  ">Total Payable Amount</div>
        <div class="text-xl text-tableText  font-medium mt-2">{{`Rs. ${totalAmount.toFixed(2)}`}}</div>
        <div class="mt-1">Taxes included</div>
      </div>
    </div>



    <!-- CONTACT US  -->
    <div class="border-b relative mt-2 pb-6">
      <div v-if="invoiceConfigration.contact_number || invoiceConfigration.email || invoiceConfigration.address" class="font-bold text-lg text-tableText ml-1 mb-1 px-2">CONTACT US</div>
        <div class="flex px-2">
            <div v-if="invoiceConfigration.contact_number" class="flex items-center text-xs font-medium">
                <div class=" ml-1 mr-2 p-1 rounded-full"><SmartphoneIcon class="w-4 h-4 " /></div><a href="javascript:void(0)"> {{ invoiceConfigration.contact_number }}</a> 
            </div>
            <div v-if="invoiceConfigration.email" class="flex items-center ml-4 text-xs font-medium">
                <div class=" ml-1 mr-2 p-1 rounded-full"><GlobeIcon class="w-4 h-4 " /></div><a href="javascript:void(0)">{{ invoiceConfigration.email }}</a> 
            </div>
        </div>
        <div v-if="invoiceConfigration.address" class="flex flex-wrap items-center mt-1 px-2 text-xs font-medium">
            <div class=" ml-1 mr-2 p-1 rounded-full"><MapIcon class="w-4 h-4 " /></div>
            <a href="javascript:void(0)" class="w-56"> {{ invoiceConfigration.address }}
            </a> 
        </div>

    </div>
    <!-- <div class="flex justify-end">
        <button class="btn-close" @click="closeModel">Back</button>
    </div> -->
    
  </div>
</template>

<script setup lang="ts">
import logoComp from '../login/logoComp.vue'
import { storeToRefs } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useInvoicesStore } from "@/stores/matrix/invoice";
import { useProfileStore } from "@/stores/matrix/profile";
import invoiceReceiptRow from './invoiceReceiptRow.vue'
import { useLogoStore } from '@/stores/utils/logo'
import { useInvoiceConfigrationStore } from '@/stores/matrix/invoiceConfigration'


import * as htmlToImage from 'html-to-image';

const profileStore  = useProfileStore();
const invoicesStore = useInvoicesStore();
const invoiceConfigrationStore = useInvoiceConfigrationStore()

const logoStore = useLogoStore()
const { logoData } = storeToRefs(logoStore)


const { showInvoiceReceiptModal, invoiceData } = storeToRefs(invoicesStore);
const { profile } = storeToRefs(profileStore);


interface InoviceConfig {
id?: string
domain_id?: string
created_by?: string
contact_number?: string
qr_code_url?: string
logo_url?: string
logo_name?: string
gst_number?: string
address?: string
email?: string
created_at?: string
updated_at?: string
}


const isPaymentProofValid = computed(() => {
let data = invoiceData.value
if(data && data.payment_proof){
  return data.payment_proof.Valid? true : false
}
return false
})

const invoiceConfigration = computed<InoviceConfig>(() => {
return invoiceConfigrationStore.invoiceConfigrations as InoviceConfig
})


const imgLoad = ref(false)

const domainName = computed(() => {
return logoData.value
})


function  handleImageLoad() {
imgLoad.value = true
}
function handleImageError(error: any) {
imgLoad.value = false
}


function calculateGst() {
return (parseInt(invoiceData.value.payable_amount) * 18) / 100
}
const totalAmount = computed(() => {
return parseInt(invoiceData.value.payable_amount) + calculateGst()
})
function closeModel() {
  showInvoiceReceiptModal.value = false;
  invoiceData.value = {};
}



const onclicked = () => {

var node: HTMLElement = document.getElementById('invoice-modal2') as HTMLElement;
node?.classList.remove("hidden")

htmlToImage.toPng(node)
  .then(function (dataUrl: any) {
    downloadfile(dataUrl)
    node.classList.add("hidden")
  })
  .catch(function (error: any) {
    console.error('oops, something went wrong!', error);
    node.classList.add("hidden")
  });
}
  

const downloadfile = (data: any) => {
  const imagePath = data;
  
  const link = document.createElement('a');
  link.href = imagePath;    
  link.download = `${profile.value.name}_invoice${invoiceData.value.id}.jpg`; // Replace 'image.jpg' with the desired file name
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

</script>