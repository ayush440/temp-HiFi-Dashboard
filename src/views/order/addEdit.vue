<template>
  <Modal
    size="lg:w-[990px] md:w-[700px]"
    v-model="showAddEditModal"
    :title="order.id ? `Edit Order Info` : `Add Order Info`"
    @confirm="() => submitForm()"
  >
    <form
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      @submit.prevent="save(order.id|| 0)"
    >
      <div class="input-form mt-3">
        <label for="order_id" class="form-label w-full flex flex-col sm:flex-row"> Order Id </label>
        <input
          id="order_id"
          v-model.trim="validate.order_id.$model"
          type="text"
          name="order_id"
          class="form-control"
          :class="{ 'is-invalid': validate.order_id.$error }"
          placeholder="enter order id"
        />
        <template v-if="validate.order_id.$error">
          <div
            v-for="(error, index) in validate.order_id.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="tag" class="form-label w-full flex flex-col sm:flex-row"> Order Tag </label>
        <input
          id="tag"
          v-model.trim="validate.tag.$model"
          type="text"
          name="tag"
          class="form-control"
          :class="{ 'is-invalid': validate.tag.$error }"
          placeholder="enter order tag"
        />
        <template v-if="validate.tag.$error">
          <div v-for="(error, index) in validate.tag.$errors" :key="index" class="text-danger mt-2">
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="variety" class="form-label w-full flex flex-col sm:flex-row">
          Order Variety
        </label>
        <input
          id="variety"
          v-model.trim="validate.variety.$model"
          type="text"
          name="variety"
          class="form-control"
          :class="{ 'is-invalid': validate.variety.$error }"
          placeholder="enter order variety"
        />
        <template v-if="validate.variety.$error">
          <div
            v-for="(error, index) in validate.variety.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="tradingsymbol" class="form-label w-full flex flex-col sm:flex-row">
          Trading Symbol
        </label>
        <input
          id="tradingsymbol"
          v-model.trim="validate.tradingsymbol.$model"
          type="text"
          name="tradingsymbol"
          class="form-control"
          :class="{ 'is-invalid': validate.tradingsymbol.$error }"
          placeholder="enter tradingsymbol"
        />
        <template v-if="validate.tradingsymbol.$error">
          <div
            v-for="(error, index) in validate.tradingsymbol.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="exchange" class="form-label w-full flex flex-col sm:flex-row"> Exchange </label>
        <input
          id="exchange"
          v-model.trim="validate.exchange.$model"
          type="text"
          name="exchange"
          class="form-control"
          :class="{ 'is-invalid': validate.exchange.$error }"
          placeholder="enter exchange"
        />
        <template v-if="validate.exchange.$error">
          <div
            v-for="(error, index) in validate.exchange.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="instrument_token" class="form-label w-full flex flex-col sm:flex-row">
          Instrument Token
        </label>
        <input
          id="instrument_token"
          v-model.trim="validate.instrument_token.$model"
          type="number"
          name="instrument_token"
          class="form-control"
          :class="{ 'is-invalid': validate.instrument_token.$error }"
          placeholder="enter Instrument token"
        />
        <template v-if="validate.instrument_token.$error">
          <div
            v-for="(error, index) in validate.instrument_token.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="transaction_type" class="form-label w-full flex flex-col sm:flex-row">
          Transaction Type
        </label>
        <input
          id="transaction_type"
          v-model.trim="validate.transaction_type.$model"
          type="text"
          name="transaction_type"
          class="form-control"
          :class="{ 'is-invalid': validate.transaction_type.$error }"
          placeholder="enter transaction type"
        />
        <template v-if="validate.transaction_type.$error">
          <div
            v-for="(error, index) in validate.transaction_type.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="product" class="form-label w-full flex flex-col sm:flex-row">
          Product Type
        </label>
        <input
          id="product"
          v-model.trim="validate.product.$model"
          type="text"
          name="product"
          class="form-control"
          :class="{ 'is-invalid': validate.product.$error }"
          placeholder="enter product type"
        />
        <template v-if="validate.product.$error">
          <div
            v-for="(error, index) in validate.product.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="order_type" class="form-label w-full flex flex-col sm:flex-row">
          Order Type
        </label>
        <input
          id="order_type"
          v-model.trim="validate.order_type.$model"
          type="text"
          name="order_type"
          class="form-control"
          :class="{ 'is-invalid': validate.order_type.$error }"
          placeholder="enter order_type type"
        />
        <template v-if="validate.order_type.$error">
          <div
            v-for="(error, index) in validate.order_type.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="validity" class="form-label w-full flex flex-col sm:flex-row"> Validity </label>
        <input
          id="validity"
          v-model.trim="validate.validity.$model"
          type="text"
          name="validity"
          class="form-control"
          :class="{ 'is-invalid': validate.validity.$error }"
          placeholder="enter validity "
        />
        <template v-if="validate.validity.$error">
          <div
            v-for="(error, index) in validate.validity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="quantity" class="form-label w-full flex flex-col sm:flex-row"> Quantity </label>
        <input
          id="quantity"
          v-model.trim="validate.quantity.$model"
          type="number"
          name="quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.quantity.$error }"
          placeholder="enter re-entry"
        />
        <template v-if="validate.quantity.$error">
          <div
            v-for="(error, index) in validate.quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="filled_quantity" class="form-label w-full flex flex-col sm:flex-row">
          Filled Quantity
        </label>
        <input
          id="filled_quantity"
          v-model.trim="validate.filled_quantity.$model"
          type="number"
          name="filled_quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.filled_quantity.$error }"
          placeholder="enter re-entry"
        />
        <template v-if="validate.filled_quantity.$error">
          <div
            v-for="(error, index) in validate.filled_quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="pending_quantity" class="form-label w-full flex flex-col sm:flex-row">
          Pending Quantity
        </label>
        <input
          id="pending_quantity"
          v-model.trim="validate.pending_quantity.$model"
          type="number"
          name="pending_quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.pending_quantity.$error }"
          placeholder="enter re-entry"
        />
        <template v-if="validate.pending_quantity.$error">
          <div
            v-for="(error, index) in validate.pending_quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="cancelled_quantity" class="form-label w-full flex flex-col sm:flex-row">
          Cancelled Quantity
        </label>
        <input
          id="cancelled_quantity"
          v-model.trim="validate.cancelled_quantity.$model"
          type="number"
          name="cancelled_quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.cancelled_quantity.$error }"
          placeholder="enter re-entry"
        />
        <template v-if="validate.cancelled_quantity.$error">
          <div
            v-for="(error, index) in validate.cancelled_quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="price" class="form-label w-full flex flex-col sm:flex-row"> Price </label>
        <input
          id="price"
          v-model.trim="validate.price.$model"
          type="number"
          step="0.01"
          name="price"
          class="form-control"
          :class="{ 'is-invalid': validate.price.$error }"
          placeholder="enter  price"
        />
        <template v-if="validate.price.$error">
          <div
            v-for="(error, index) in validate.price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="trigger_price" class="form-label w-full flex flex-col sm:flex-row">
          Trigger Price
        </label>
        <input
          id="trigger_price"
          v-model.trim="validate.trigger_price.$model"
          type="number"
          step="0.01"
          name="trigger_price"
          class="form-control"
          :class="{ 'is-invalid': validate.price.$error }"
          placeholder="enter  trigger_price"
        />
        <template v-if="validate.trigger_price.$error">
          <div
            v-for="(error, index) in validate.trigger_price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="average_price" class="form-label w-full flex flex-col sm:flex-row">
          Average Price
        </label>
        <input
          id="average_price"
          v-model.trim="validate.average_price.$model"
          type="number"
          step="0.01"
          name="average_price"
          class="form-control"
          :class="{ 'is-invalid': validate.average_price.$error }"
          placeholder="enter  average_price"
        />
        <template v-if="validate.average_price.$error">
          <div
            v-for="(error, index) in validate.average_price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="status" class="form-label w-full flex flex-col sm:flex-row"
          >Select Status:</label
        >
        <div>
          <select
            v-model.trim="validate.status.$model"
            id="status"
            name="status"
          >
            <option value="">Choose an option</option>
            <option key="COMPLETE" value="COMPLETE">COMPLETE</option>
            <option key="REJECTED" value="REJECTED">REJECTED</option>
            <option key="PENDING" value="PENDING">PENDING</option>
            <option key="CREATING" value="CREATING">CREATING</option>

            <!-- <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option> -->
          </select>
        </div>
        <template v-if="validate.status.$error">
          <div
            v-for="(error, index) in validate.status.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="status_message" class="form-label w-full flex flex-col sm:flex-row">
          Status Messasge
        </label>
        <input
          id="status_message"
          v-model.trim="validate.status_message.$model"
          type="text"
          name="status_message"
          class="form-control"
          :class="{ 'is-invalid': validate.status_message.$error }"
          placeholder="enter ltp"
        />
        <template v-if="validate.status_message.$error">
          <div
            v-for="(error, index) in validate.status_message.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="flex justify-end items-end md:col-span-2 lg:col-span-3">
        <button type="submit" class="btn-submit" @click="submitForm">Submit</button>

        <button type="button" class="btn-close" @click="closeModel">Close</button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { useOrdersStore } from '@/stores/matrix/order'
import { storeToRefs } from 'pinia'
import { toRefs, computed, reactive, watch, ref } from 'vue'
import { required, minLength, integer } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const ordersStore = useOrdersStore()

const { showAddEditModal, editOrderData } = storeToRefs(ordersStore)
const { addEditOrder } = ordersStore

function closeModel() {
  editOrderData.value = {}
  showAddEditModal.value = false
  resetValidation()
}

interface Order {
  id?: number
  order_id?: string
  tag?: string
  variety?: string
  tradingsymbol?: string
  exchange?: string
  instrument_token?: number
  transaction_type?: string
  product?: string
  order_type?: string
  validity?: string
  quantity?: number
  filled_quantity?: number
  pending_quantity?: number
  cancelled_quantity?: number
  price?: number
  trigger_price?: number
  average_price?: number
  status_message?: string
  status?: string
}

const order = computed<Order>(() => {
  return editOrderData.value
})

let formData = reactive({
  order_id: '',
  tag: '',
  variety: '',
  tradingsymbol: '',
  exchange: '',
  instrument_token: 0,
  transaction_type: '',
  product: '',
  order_type: '',
  validity: '',
  quantity: 0,

  filled_quantity: 0,
  pending_quantity: 0,
  cancelled_quantity: 0,
  price: 0,
  trigger_price: 0,
  average_price: 0,
  status_message: '',
  status: ''
})

watch(order, (newOrder, oldOrder) => {
  if (newOrder !== oldOrder) {
    formData.order_id = newOrder.order_id !== undefined ? newOrder.order_id : ''
    formData.tag = newOrder.tag !== undefined ? newOrder.tag : ''
    formData.variety = newOrder.variety !== undefined ? newOrder.variety : ''
    formData.tradingsymbol = newOrder.tradingsymbol !== undefined ? newOrder.tradingsymbol : ''
    formData.exchange = newOrder.exchange !== undefined ? newOrder.exchange : ''
    formData.instrument_token = newOrder.instrument_token !== undefined ? newOrder.instrument_token : 0
    formData.transaction_type = newOrder.transaction_type !== undefined ? newOrder.transaction_type : ''
    formData.product = newOrder.product !== undefined ? newOrder.product : ''
    formData.order_type = newOrder.order_type !== undefined ? newOrder.order_type : ''
    formData.validity = newOrder.validity !== undefined ? newOrder.validity : ''
    formData.quantity = newOrder.quantity !== undefined ? newOrder.quantity : 0
    formData.filled_quantity = newOrder.filled_quantity !== undefined ? newOrder.filled_quantity : 0
    formData.pending_quantity = newOrder.pending_quantity !== undefined ? newOrder.pending_quantity : 0
    formData.cancelled_quantity = newOrder.cancelled_quantity !== undefined ? newOrder.cancelled_quantity : 0
    formData.price = newOrder.price !== undefined ? newOrder.price : 0
    formData.trigger_price = newOrder.trigger_price !== undefined ? newOrder.trigger_price : 0
    formData.average_price = newOrder.average_price !== undefined ? newOrder.average_price : 0
    formData.status_message = newOrder.status_message !== undefined ? newOrder.status_message : ''

    if (newOrder.status) {
      formData.status = newOrder.status.toUpperCase()
    } else {
      formData.status = newOrder.status !== undefined ? newOrder.status : ''
    }
  }
})

const rules = {
  order_id: {
    required,
    minLength: minLength(1)
  },
  tag: {
    required
  },
  variety: {
    required
  },
  tradingsymbol: {
    required
  },
  exchange: {
    required
  },
  instrument_token: {
    required
  },
  transaction_type: {
    required
  },
  product: {
    required
  },
  order_type: {
    required
  },
  validity: {
    required
  },
  quantity: {
    required
  },
  filled_quantity: {
    required
  },
  pending_quantity: {
    required
  },
  cancelled_quantity: {
    required
  },
  price: {
    required
  },
  trigger_price: {
    required
  },
  average_price: {
    required
  },
  status_message: {
    required
  },
  status: {
    required
  }
}

let validate = useVuelidate(rules, toRefs(formData))

const submitForm = async () => {
  validate.value.$touch()
  if (!validate.value.$invalid) {
    showAddEditModal.value = false
  }
}

function resetValidation() {
  validate = useVuelidate(rules, toRefs(formData))
}

const save = async (id: number) => {
  validate.value.$touch()
  validate.value.$touch()
  if (validate.value.$invalid) {
  } else {
    await addEditOrder(id, formData)
    showAddEditModal.value = false
    editOrderData.value = {}
    resetValidation()
  }
}
</script>
