<template>
    <tr>
        <td class="border-b px-2">
            <div class="font-medium whitespace-nowrap">
                {{ invoiceItem.item_name }}
            </div>
            <div class="text-sm brightness-90 mt-0.5 whitespace-nowrap">
                {{ invoiceItem.item_description }}
            </div>
            </td>
            <td class="text-right border-b w-32">
            {{ invoiceItem.quantity }}
            </td>
            <td class="text-right border-b w-32 text-nowrap">
            {{ `Rs. ${invoiceItem.amount}` }}
            </td>
            <td
            class="text-right px-2 border-b w-32 font-medium"
            >
            {{ invoiceItem.quantity && invoiceItem.amount?`Rs. ${(invoiceItem.quantity*invoiceItem.amount).toFixed(2)}`:'0.00' }}
        </td>
    </tr>
</template>


<script setup lang="ts">
import { computed, watch,ref } from 'vue';

interface InvoiceItem {
    id?: number;
    item_name?: string;
    item_description?: string;
    quantity?: number;
    amount?: number;
    rate?: number;
}

const props: any = defineProps({
    item: Object,
});
const invoiceItem = computed<InvoiceItem>(() =>{
    return props.item
});


</script>