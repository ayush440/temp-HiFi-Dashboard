<template>
  <Modal1 size="5xl" :show="showAngelModal" @close ="closeModel" :showHeader="false">


    <template #body>
      <div class="flex px-3 py-2 text-lg font-medium justify-between">
      <div>Angel ({{ typeofdata }})</div>
      <div class="flex border-b">
            <div
              @click="changebutton('Orders')"
              class="py-4 px-4 border-b-2 flex items-center cursor-pointer  "
              :class="{ 'border-b-2 border-primary dark:border-white': showOrdersbol }"
            >
              <FilesIcon class="w-4 h-4 mr-2" /> Orders
            </div>
            <div
              @click="changebutton('Positions')"
              class="py-4  px-4 border-b-2 flex items-center cursor-pointer"
              :class="{ 'border-b-2 border-primary dark:border-white': showPositionsbol }"
            >
              <FilesIcon class="w-4 h-4 mr-2" /> Positions
            </div>
          </div>
      </div>
      <!-- BEGIN: Validation Form -->
      <div class="table-container-modal text-nowrap intro-y">
        <table class="-mt-2 dark:text-white"
          v-if="showOrdersbol"
        >
          <thead>
            <tr class="text-start">
              <th class="text-center whitespace-nowrap">TIME</th>
              <th class="text-center whitespace-nowrap">TICKER</th>
              <th class="text-center whitespace-nowrap">SIDE</th>
              <th class="text-center whitespace-nowrap">ORDER TYPE</th>
              <th class="text-center whitespace-nowrap">PRICE</th>
              <th class="text-center whitespace-nowrap">AVG PRICE</th>
              <th class="text-center whitespace-nowrap">QTY</th>
              <th class="text-center whitespace-nowrap">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="showTableData && orders && orders.length > 0"
              v-for="(order, i) in orders"
              :key="i"
            >
              <td>{{ order.updatetime }}</td>
              <td>{{ order.tradingsymbol }} ({{ order.exchange }})</td>
              <td>{{ order.transactiontype }}</td>
              <td>{{ order.ordertype }} ({{ order.producttype }})</td>
              <td>{{ order.price }}</td>
              <td>{{ order.averageprice }}</td>
              <td>{{ order.filledshares }}/{{ order.quantity }}</td>
              <td>{{ order.status }}</td>
            </tr>

            <div v-else-if="!showTableData" class="col-span-6 sm:col-span-3 xl:col-span-2 ml-2 flex items-center">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <tr v-else>
              <td
                colspan="9"
                style="text-align: center; background: transparent"
                class="text-center"
              >
                <!-- <div style="height: 170px; width: 185px; margin: auto">
                  <img
                    src="../../assets/svgs/no-orders.svg"
                    alt=""
                    srcset=""
                    style="box-shadow: none"
                  />
                </div> -->
                <div>No orders</div>
              </td>
            </tr>
          </tbody>
        </table>

        <table
          class="w-full table table-report -mt-2 dark:text-white"
          v-if="showPositionsbol"
        >
          <thead>
            <tr class="text-start">
              <th class="text-center whitespace-nowrap">TRADING SYMBOL</th>
              <th class="text-center whitespace-nowrap">PRODUCT</th>
              <th class="text-center whitespace-nowrap">QUANTITY</th>
              <th class="text-center whitespace-nowrap">LTP</th>
              <th class="text-center whitespace-nowrap">PNL</th>
              <th class="text-center whitespace-nowrap">REALISED</th>
              <th class="text-center whitespace-nowrap">UN REALISED</th>
              <th class="text-center whitespace-nowrap">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="positions && positions.length > 0"
              v-for="(order, i) in positions"
              :key="i"
            >
              <td>{{ order.tradingsymbol }} ({{ order.exchange }})</td>
              <td>{{ order.producttype }}</td>
              <td>{{ order.netqty }}</td>
              <td>{{ order.ltp }}</td>
              <td>{{ order.pnl }}</td>
              <td>{{ order.realised }}</td>
              <td>{{ order.unrealised }}</td>
              <td class="table-report__action" >
                <div class="flex justify-center items-center">
                  <a  class="flex items-center text-danger whitespace-nowrap" @click="openSqOffModal(order)"  href="javascript:;" v-if="order.netqty != 0">
                      <DeleteIcon class="w-4 h-4 mr-1" /> Sq. Off
                  </a>
                </div>
            </td>
            </tr>

            <tr v-else>
              <td
                colspan="9"
                style="text-align: center; background: transparent"
                class="text-center"
              >
                <!-- <div style="height: 170px; width: 185px; margin: auto">
                  <img
                    src="../../assets/svgs/no-orders.svg"
                    alt=""
                    srcset=""
                    style="box-shadow: none"
                  />
                </div> -->
                <div>No Positions</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end items-end">
        <button type="button" class="btn-close" @click="closeModel">Close</button>
      </div>
    </template>

  </Modal1>
</template>

<script setup lang="ts">
import { useBrokersStore } from "@/stores/matrix/broker";
import { storeToRefs } from "pinia";
import { toRefs, computed, ref, watchEffect } from "vue";
let showOrdersbol = ref(true);
let typeofdata = ref("Orders");
let showPositionsbol = ref(false);
const brokersStore = useBrokersStore();

const { showOrderPositionModal, brokerOrders, brokerPositions,showSqOffModal, brokerPosSqOffData, showBrokerName } = storeToRefs(brokersStore);


function changebutton(data: string) {
  if (data == "Orders") {
    showOrdersbol.value = true;
    showPositionsbol.value = false;
    typeofdata.value = "Orders"
  }else if(data == "Positions"){
    showOrdersbol.value = false;
    showPositionsbol.value = true;
    typeofdata.value = "Positions"
  }
}

const orders = computed(() => {
    let order
    if (brokerOrders.value && brokerOrders.value.data){
      order = brokerOrders.value.data;
    }else{
      order = []
    }
  return order
  });

const positions = computed(() => {
  let post;
  if (brokerPositions.value && brokerPositions.value.data) {
    post = brokerPositions.value.data;
  } else {
    post = [];
  }
  return post;
});
function closeModel() {
  showOrderPositionModal.value = false
  brokerOrders.value = {};
  brokerPositions.value = {};
  showOrdersbol.value = true
  showPositionsbol.value = false
  showBrokerName.value = ""
}

const showAngelModal = ref<boolean>(false)
watchEffect(() => {
  showAngelModal.value = showOrderPositionModal.value && showBrokerName.value === "angel"
})

// const showAngelModal = computed(() => {
//   return showOrderPositionModal.value && showBrokerName.value === "angel"
// })

const showTableData = computed<boolean>(() => {
    const state = brokersStore.state['getBrokerOrders'];
    return state && state.loading === false;
});

function openSqOffModal(posData: any) {

  if(posData.netqty > 0){
        brokerPosSqOffData.value.transaction_type = "SELL"
    }else if(posData.netqty < 0){
        brokerPosSqOffData.value.transaction_type = "BUY"
    }
    
    brokerPosSqOffData.value.exchange = posData.exchange
    brokerPosSqOffData.value.tradingsymbol = posData.tradingsymbol
    brokerPosSqOffData.value.product = posData.producttype
    brokerPosSqOffData.value.instrument_token =  typeof posData.symboltoken === "string" ? posData.symboltoken : String(posData.symboltoken)
    brokerPosSqOffData.value.quantity = Math.abs(Number(posData.netqty))

    
    showSqOffModal.value = true;
}
</script>
