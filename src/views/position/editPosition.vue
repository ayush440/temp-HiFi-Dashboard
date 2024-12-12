<!-- <template>
  <Modal
    size="lg:w-[990px] md:w-[700px]"
    v-model="showAddEditModal"
    :title="positions.id ? `Edit Position Info` : `Add Position Info`"
    @confirm="() => submitForm()"
  >
    <form
      class="validate-form grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      @submit.prevent="save(positions.id)"
    >
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
          placeholder="enter instrument token"
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
        <label for="product" class="form-label w-full flex flex-col sm:flex-row"> Product </label>
        <input
          id="product"
          v-model.trim="validate.product.$model"
          type="text"
          name="product"
          class="form-control"
          :class="{ 'is-invalid': validate.product.$error }"
          placeholder="enter product "
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
        <label for="quantity" class="form-label w-full flex flex-col sm:flex-row"> Quantity </label>
        <input
          id="quantity"
          v-model.trim="validate.quantity.$model"
          type="number"
          step="0.01"
          name="quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.buy_quantity.$error }"
          placeholder="enter  quantity"
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
        <label for="buy_quantity" class="form-label w-full flex flex-col sm:flex-row">
          Buy Quantity
        </label>
        <input
          id="buy_quantity"
          v-model.trim="validate.buy_quantity.$model"
          type="number"
          step="0.01"
          name="buy_quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.buy_quantity.$error }"
          placeholder="enter buy quantity"
        />
        <template v-if="validate.buy_quantity.$error">
          <div
            v-for="(error, index) in validate.buy_quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="sell_quantity" class="form-label w-full flex flex-col sm:flex-row">
          Sell Quantity
        </label>
        <input
          id="sell_quantity"
          v-model.trim="validate.sell_quantity.$model"
          type="number"
          step="0.01"
          name="sell_quantity"
          class="form-control"
          :class="{ 'is-invalid': validate.sell_quantity.$error }"
          placeholder="enter sell quantity"
        />
        <template v-if="validate.sell_quantity.$error">
          <div
            v-for="(error, index) in validate.sell_quantity.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="multiplier" class="form-label w-full flex flex-col sm:flex-row">
          Multiplier
        </label>
        <input
          id="multiplier"
          v-model.trim="validate.multiplier.$model"
          type="number"
          step="0.01"
          name="multiplier"
          class="form-control"
          :class="{ 'is-invalid': validate.multiplier.$error }"
          placeholder="enter multiplier"
        />
        <template v-if="validate.multiplier.$error">
          <div
            v-for="(error, index) in validate.multiplier.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="buy_price" class="form-label w-full flex flex-col sm:flex-row">
          Buy Price
        </label>
        <input
          id="buy_price"
          v-model.trim="validate.buy_price.$model"
          type="number"
          step="0.01"
          name="buy_price"
          class="form-control"
          :class="{ 'is-invalid': validate.buy_price.$error }"
          placeholder="enter buy price"
        />
        <template v-if="validate.buy_price.$error">
          <div
            v-for="(error, index) in validate.buy_price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="sell_price" class="form-label w-full flex flex-col sm:flex-row">
          Sell Price
        </label>
        <input
          id="sell_price"
          v-model.trim="validate.sell_price.$model"
          type="number"
          step="0.01"
          name="sell_price"
          class="form-control"
          :class="{ 'is-invalid': validate.sell_price.$error }"
          placeholder="enter   sell price"
        />
        <template v-if="validate.sell_price.$error">
          <div
            v-for="(error, index) in validate.sell_price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>
      <div class="input-form mt-3">
        <label for="last_price" class="form-label w-full flex flex-col sm:flex-row">
          Last Price
        </label>
        <input
          id="last_price"
          v-model.trim="validate.last_price.$model"
          type="number"
          step="0.01"
          name="last_price"
          class="form-control"
          :class="{ 'is-invalid': validate.last_price.$error }"
          placeholder="enter   sell price"
        />
        <template v-if="validate.last_price.$error">
          <div
            v-for="(error, index) in validate.last_price.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form mt-3">
        <label for="message" class="form-label w-full flex flex-col sm:flex-row"> Messasge </label>
        <input
          id="message"
          v-model.trim="validate.message.$model"
          type="text"
          name="message"
          class="form-control"
          :class="{ 'is-invalid': validate.message.$error }"
          placeholder="enter Messasge"
        />
        <template v-if="validate.message.$error">
          <div
            v-for="(error, index) in validate.message.$errors"
            :key="index"
            class="text-danger mt-2"
          >
            {{ error.$message }}
          </div>
        </template>
      </div>

      <div class="input-form">
        <label for="status" class="form-label w-full flex flex-col sm:flex-row"> Status </label>
        <select
          v-model.trim="validate.status.$model"
          id="status"
          name="status"
        >
          <option value="">Choose an option</option>
          <option key="OPEN" value="OPEN">OPEN</option>
          <option key="CLOSED" value="CLOSED">CLOSED</option>
        </select>
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

      <div class="flex justify-end items-end md:col-span-2 lg:col-span-3">
        <button type="submit" class="btn-submit" @click="submitForm">Submit</button>

        <button type="button" class="btn-close" @click="closeModel">Close</button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { email, required, decimal, integer, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { usePositionsStore } from '@/stores/matrix/position'

const positionsStore = usePositionsStore()

let { showAddEditModal, addEditPositionData } = storeToRefs(positionsStore)
const { addEditPosition } = positionsStore

interface Position {
  id?: number
  tradingsymbol?: string
  exchange?: string
  instrument_token?: number
  last_price?: number
  product?: string
  quantity?: number
  buy_quantity?: number
  sell_quantity?: number
  multiplier?: number
  buy_price?: number
  sell_price?: number
  message?: string
  status?: string
}

const positions = computed<Position>(() => {
  const positions = addEditPositionData.value
  return positions || {}
})

let formData = reactive({
  tradingsymbol: '',
  exchange: '',
  instrument_token: 0,
  last_price: 0,
  product: '',
  quantity: 0,
  buy_quantity: 0,
  sell_quantity: 0,
  multiplier: 0,
  buy_price: 0,
  sell_price: 0,
  message: '',
  status: ''
})

watch(positions, (newPositions, oldPositions) => {
  if (newPositions !== oldPositions) {
    formData.tradingsymbol =
      newPositions.tradingsymbol !== undefined ? newPositions.tradingsymbol : ''
    formData.exchange = newPositions.exchange !== undefined ? newPositions.exchange : ''
    formData.instrument_token =
      newPositions.instrument_token !== undefined ? newPositions.instrument_token : 0
    formData.last_price = newPositions.last_price !== undefined ? newPositions.last_price : 0
    formData.product = newPositions.product !== undefined ? newPositions.product : ''
    formData.quantity = newPositions.quantity !== undefined ? newPositions.quantity : 0
    formData.buy_quantity = newPositions.buy_quantity !== undefined ? newPositions.buy_quantity : 0
    formData.sell_quantity =
      newPositions.sell_quantity !== undefined ? newPositions.sell_quantity : 0
    formData.multiplier = newPositions.multiplier !== undefined ? newPositions.multiplier : 0
    formData.buy_price = newPositions.buy_price !== undefined ? newPositions.buy_price : 0
    formData.sell_price = newPositions.sell_price !== undefined ? newPositions.sell_price : 0
    formData.message = newPositions.message !== undefined ? newPositions.message : ''
    formData.status = newPositions.status !== undefined ? newPositions.status : ''
  }
})

const rules = {
  tradingsymbol: {
    required
  },
  exchange: {
    required
  },
  instrument_token: {
    required
  },
  last_price: {
    required
  },
  product: {
    required
  },
  quantity: {
    required
  },
  buy_quantity: {
    required
  },
  sell_quantity: {
    required
  },
  multiplier: {
    required
  },
  buy_price: {
    required
  },
  sell_price: {
    required
  },
  message: {},
  status: {
    required
  }
}

function submitForm() {
  validate.value.$touch()
  if (!validate.value.$invalid) {
    showAddEditModal.value = false
  }
}

function closeModel() {
  showAddEditModal.value = false
  addEditPositionData.value = {}
  resetValidation()
}

let validate = useVuelidate(rules, toRefs(formData))
function resetValidation() {
  validate = useVuelidate(rules, toRefs(formData))
}

async function save(id: any) {
  validate.value.$touch()
  if (validate.value.$invalid) {
  } else {
    await addEditPosition(id, formData)
    showAddEditModal.value = false
    addEditPositionData.value = {}
    resetValidation()
  }
}
</script> -->
