import { defineStore } from 'pinia'
import { getStoredDomainsFromLocal, removeDomainFromLocal, storeDomainToLocal } from '~/libs/utils'
import { TipSuccess } from '~~/composables'

export const useDomainsStore = defineStore('domains', {
  state: () => ({
    storedDomains: []
  }),
  getters: {},
  actions: {
    storeDomain(domain: string) {
      if (!domain) return
      const t = useNuxtApp().$i18n.t
      if (!this.storedDomains.includes(domain)) {
        this.storedDomains.push(domain)
        storeDomainToLocal(domain)
        TipSuccess(t('tip.addFav'))
      } else {
        this.storedDomains = this.storedDomains.filter(d => d !== domain)
        removeDomainFromLocal(domain)
        TipSuccess(t('tip.removeFav'))
      }
    }
  },
  hydrate(state) {
    state.storedDomains = getStoredDomainsFromLocal()
  }
})
