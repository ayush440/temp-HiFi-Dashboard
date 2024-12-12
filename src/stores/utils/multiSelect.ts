// store.ts

import { defineStore } from 'pinia';

export const useMultiselectStore = defineStore('multiselect', {
  state: () => ({
    isOpen: false,
    selectedOptions: [] as number[],
    options: [] as { id: number; label: string }[],
  }),
  actions: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    updateSelectedOptions(newValues: number[]) {
      this.selectedOptions = newValues;
    },
  },
});
