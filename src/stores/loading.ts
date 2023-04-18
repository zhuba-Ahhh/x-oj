import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('counter', () => {
  const loading = ref(0)
  const subtractLoading = () => {
    loading.value--
  }
  const incrementLoading = () => {
    loading.value++
  }

  return { loading, subtractLoading, incrementLoading }
})
