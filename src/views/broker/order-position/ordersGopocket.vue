<template>
  <Modal1 size="5xl" :show="showGopocketModal" @close ="closeModel" :showHeader="false">


    <template #body>
      <div class="flex px-3 py-2 text-lg font-medium justify-between ">
        <div>Gopocket ({{ typeofdata }})</div>
        <div class="flex">
            <div
              class="hidden border-b md:flex nav-link-tabs justify-start text-center "
            >
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
      </div>
      <!-- BEGIN: Validation Form -->
      <div class="table-container-modal text-nowrap intro-y">
        <table class="-mt-2 dark:text-white" v-if="showOrdersbol">
          <thead>
            <tr class="text-start">
              <th class="text-center whitespace-nowrap">TIME</th>
              <th class="text-center whitespace-nowrap">TICKER</th>
              <th class="text-center whitespace-nowrap">SIDE</th>
              <th class="text-center whitespace-nowrap">ORDER TYPE</th>
              <th class="text-center whitespace-nowrap">PRICE</th>
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
                <td>{{ order.orderTime }}</td>
                <td>{{ order.tradingSymbol }} ({{ order.exchange }})</td>
                <td>
                  <span v-if="order.transType == 'B'">Buy</span>
                  <span v-else-if="order.transType == 'S'">Sell</span>
                  <span v-else>{{ order.transType }}</span>
                </td>
                <td>{{ order.orderType }} ({{ order.product }})</td>
                <td>{{ order.price }}</td>
                <td>{{ order.rqty }}/{{ order.qty }}</td>
                <td>{{ order.orderStatus }}</td>
                
            </tr>

            <div v-else-if="!showTableData" class="col-span-6 sm:col-span-3 xl:col-span-2 ml-2 flex items-center">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <tr v-else>
              <td
                colspan="12"
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
       
        <table class="w-full table table-report -mt-2 dark:text-white" v-if="showPositionsbol">
          <thead>
            <tr class="text-start">
              <th class="text-center whitespace-nowrap">TRADING SYMBOL	</th>
              <th class="text-center whitespace-nowrap">PRODUCT	</th>
              <th class="text-center whitespace-nowrap">QUANTITY</th>
              <th class="text-center whitespace-nowrap">LTP</th>
              <th class="text-center whitespace-nowrap">M2M</th>
              <th class="text-center whitespace-nowrap">PNL</th>
              <th class="text-center whitespace-nowrap">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="positions && positions.length > 0"
              v-for="(order, i) in positions"
              :key="i"
            >
                <td>{{ order.tradingsymbol }}</td>
                <td>
                  <span v-if="order.product=='I'">Intraday</span>
                  <span v-else-if="order.product=='D'">Delivery </span>
                  <span v-else>{{ order.product }}</span>
                </td>
                <td>{{ order.netQty }}</td>
                <td>{{ order.ltp }}</td>
                <td>{{ order.m2m }}</td>
                <td>{{ order.pnl }}</td>
                <td class="table-report__action" >
                    <div class="flex justify-center items-center">
                        <a  class="flex items-center text-danger whitespace-nowrap" @click="openSqOffModal(order)"  href="javascript:;" v-if="order.netQty != 0">
                            <DeleteIcon class="w-4 h-4 mr-1" /> Sq. Off
                        </a>
                    </div>
                </td>
            </tr>

            <tr v-else >
              <td
                colspan="12"
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
import { useBrokersStore } from '@/stores/matrix/broker'
import { storeToRefs } from "pinia";
import { toRefs, computed, reactive, watch, ref, watchEffect } from "vue";

let showOrdersbol = ref(true);
let typeofdata = ref("Orders")
let showPositionsbol = ref(false);
const brokersStore = useBrokersStore();

const { brokerOrders, brokerPositions,showSqOffModal,brokerPosSqOffData, showOrderPositionModal, showBrokerName } = storeToRefs(brokersStore);

function closeModel() {
  showOrderPositionModal.value = false
  brokerOrders.value = {};
  brokerPositions.value = {};
  showOrdersbol.value = true
  showPositionsbol.value = false
  showBrokerName.value = ""
}
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
    if (brokerOrders.value && brokerOrders.value.result){
      order = brokerOrders.value.result;
    }else{
      order = []
    }
    return Array.isArray(order) ? order : []
});

const positions = computed(() => {
  let pos
  if (brokerPositions.value && brokerPositions.value.result){
    pos = brokerPositions.value.result;
  }else{
    pos = []
  } 
  return Array.isArray(pos) ? pos : []
});

const showTableData = computed<boolean>(() => {
    const state = brokersStore.state['getBrokerOrders'];
    return state && state.loading === false;
});

const showGopocketModal = ref<boolean>(false)
watchEffect(() => {
  showGopocketModal.value = showOrderPositionModal.value && showBrokerName.value === "gopocket"
})

function openSqOffModal(posData: any) {

  if(posData.netQty > 0){
      brokerPosSqOffData.value.transaction_type = "SELL"
  }else if(posData.netQty < 0){
      brokerPosSqOffData.value.transaction_type = "BUY"
  }

  brokerPosSqOffData.value.exchangeange = posData.exchange
  brokerPosSqOffData.value.tradingsymbol = posData.tradingsymbol
  brokerPosSqOffData.value.product = posData.product
  brokerPosSqOffData.value.instrument_token = typeof posData.token === "string" ? posData.token : String(posData.token)
  brokerPosSqOffData.value.quantity = Math.abs(posData.netQty)



  showSqOffModal.value = true;
}


</script>


