<template>
  <Modal1 size="xl" :show="showAddEditModal" @close="closeModel">
    

    <template #header>
      <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl">
        {{ matrixJoiner.id ? `Edit   Joiner Info` : `Add   Joiner Info` }}
      </div>
    </template>
    
    <template #body>
      <form class="p-4 pt-2 validate-form" @submit.prevent="save(matrixJoiner.id || 0)">

        <div class="input-form mt-3" v-if="!matrixJoiner.id">
          <label for="broker_id" class="form-label w-full flex flex-col sm:flex-row font-bold mb-1">
              Broker
            </label>
        
            <MultiselectDropdown :initialOptions="dropdownOptions" imageShow :selected="handleSelectedBroker"/>

            <template v-if="validate.broker_id.$error">
              <div v-for="(error, index) in validate.broker_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          
        </div>

        <div class="input-form mt-3">
          <label for="lots" class="form-label w-full flex flex-col sm:flex-row"> Lot Size </label>
          <input id="lots" v-model.trim="validate.lots.$model" type="number" name="lots" class="form-control"
            :class="{ 'is-invalid': validate.lots.$error }" placeholder="enter lot size" />
          <template v-if="validate.lots.$error">
            <div v-for="(error, index) in validate.lots.$errors" :key="index" class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>

        <div class="input-form mt-3">
          <label for="re_entry" class="form-label w-full flex flex-col sm:flex-row"> Re Entry </label>
          <input id="re_entry" v-model.trim="validate.re_entry.$model" type="number" name="re_entry" class="form-control"
            :class="{ 'is-invalid': validate.re_entry.$error }" placeholder="enter re-entry" />
          <template v-if="validate.re_entry.$error">
            <div v-for="(error, index) in validate.re_entry.$errors" :key="index" class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>

        <div class="input-form mt-3">
          <label class="form-label w-full flex flex-col sm:flex-row"> Status </label>
          <ButtonSwitch id="is_active" name="is_active" v-model.trim="validate.is_active.$model" @update:modelValue.trim="(value: any) => {
              formData.is_active = value
            }
            " />
        </div>

        <div class="flex justify-end items-end md:col-span-2 lg:col-span-3">
          <button type="submit" class="btn-submit" @click="submitForm">Submit</button>

          <button type="button" class="btn-close" @click="closeModel">Close</button>
        </div>
      </form>
    </template>
  </Modal1>
</template>

<script setup lang="ts">
import { showToast } from '@/request/request'
import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'
import { useBrokersStore } from '@/stores/matrix/broker'
import { storeToRefs } from 'pinia'
import { toRefs, computed, reactive, watch, watchEffect, ref } from 'vue'
import { required, minLength, integer } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'




const matrixJoinersStore = useMatrixJoinersStore()
const brokersStore = useBrokersStore()

const { showAddEditModal, addEditMatrixJoinerData, joinStrategyId } = storeToRefs(matrixJoinersStore)
const { addEditMatrixJoiner } = matrixJoinersStore






interface MatrixJoiner {
  id?: number
  broker_id?: number
  strategy_id?: number
  lots?: number
  re_entry?: number
  is_active?: boolean
}
interface Broker {
  id?: any
  broker_name?: string
  broker_userid?: string
}

const dropdownOptions = computed<any>(() => {
  let temp = brokersStore.brokers || []
  if (temp.length > 0) {
    return temp.map((broker: Broker) => {
      return {
        id: broker.id,
        label: `${broker.broker_name}-(${broker.broker_userid})`,
        image: broker.broker_name
      };
    });
  }
  return []
})

const selectedBrokerOptions = ref([])

const matrixJoiner = computed<MatrixJoiner>(() => {
  return addEditMatrixJoinerData.value
})

let formData = reactive({
  id: 0,
  broker_id: 0,
  strategy_id: 0,
  lots: 0,
  re_entry: 0,
  is_active: false
})

const handleSelectedBroker = (option: any) => {
  selectedBrokerOptions.value = option
}

watch(matrixJoiner, (newMatrixJoiner, oldMatrixJoiner) => {
  if (newMatrixJoiner !== oldMatrixJoiner) {
    formData.strategy_id = newMatrixJoiner.strategy_id !== undefined ? newMatrixJoiner.strategy_id : 0
    formData.broker_id = newMatrixJoiner.broker_id !== undefined ? newMatrixJoiner.broker_id : 0
    formData.lots = newMatrixJoiner.lots !== undefined ? newMatrixJoiner.lots : 0
    formData.re_entry = newMatrixJoiner.re_entry !== undefined ? newMatrixJoiner.re_entry : 0
    formData.is_active = newMatrixJoiner.is_active !== undefined ? newMatrixJoiner.is_active : false
  }
})

const rules = {
  id: {
    required
  },
  broker_id: {

  },
  strategy_id: {

  },
  lots: {
    required
  },
  re_entry: {
    required
  },
  is_active: {
    required
  }
}

let validate = useVuelidate(rules, toRefs(formData))


function closeModel() {
  addEditMatrixJoinerData.value = {}
  showAddEditModal.value = false
  resetValidation()
}
const submitForm = async () => {
  validate.value.$touch()
  // if (!validate.value.$invalid) {
  //   showAddEditModal.value = false
  // }
}

function resetValidation() {
  validate = useVuelidate(rules, toRefs(formData))
}

const save = async (id: number) => {
  validate.value.$touch()
  validate.value.$touch()
  if (validate.value.$invalid) {
    showToast("Please check the filled form!")
  } else {
        if (joinStrategyId.value) {
            formData.strategy_id = joinStrategyId.value
        }
        
        if(selectedBrokerOptions.value.length > 0){
            for(let i = 0; i < selectedBrokerOptions.value.length; i++){
                formData.broker_id = parseInt(selectedBrokerOptions.value[i])

                await addEditMatrixJoiner(id, formData)
               
            }
            addEditMatrixJoinerData.value = {};
            joinStrategyId.value = 0;
            selectedBrokerOptions.value = [];
            resetValidation();
        }else{
            await addEditMatrixJoiner(id, formData)
            addEditMatrixJoinerData.value = {};
            resetValidation();
        }
        showAddEditModal.value = false
  }
}



</script>
