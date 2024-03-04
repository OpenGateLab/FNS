import { defineStore } from 'pinia'
import { LoginResponse } from '~/libs/model'
import API from '~/libs/api'

export const useAccountStore = defineStore('account', {
  state: () => ({
    chainId: '',
    account: '',
    inviteId: '',
    id: '',
    publicAddress: '',
    inviteCode: '',
    fullName: '',
    role: '',
    language: 'en',
    token: '',
    domain: ''
  }),
  persist: {
    storage: sessionStorage,
    paths: [
      'inviteId',
      'id',
      'language',
      'inviteCode',
      'fullName',
      'token',
      'role',
      'publicAddress'
    ]
  },
  getters: {
    shortAccount: state => {
      if (!state.account) return '...'
      else if (state.domain) return state.domain
      else return `${state.account.slice(0, 6)}...${state.account.slice(-4)}`
    },
    connected: state => !!state.account,
    logined: state => !!state.id,
    rightNetwork: state => {
      return state.chainId === '0x144'
    },
    network: state => {
      return state.chainId === '0x144' ? 'Mainnet' : 'Error'
    }
  },
  actions: {
    setAccount(account: string) {
      this.account = account.toLowerCase()
      API.findReverseViaAddress(this.account).then(reverses => {
        console.log('reverses', reverses)
        if (reverses[1]) this.domain = reverses[0]
      })
    },
    setNetwork(chainId: string) {
      this.chainId = chainId
    },
    setInviteId(inviteId: string) {
      this.inviteId = inviteId
    },
    setLanguage(lang: string) {
      this.language = lang
    },
    loginIn(user: LoginResponse) {
      this.id = user.id
      this.token = user.jwt
      this.role = user.role
      this.fullName = user.fullName
      this.inviteCode = user.inviterCode
      this.publicAddress = user.publicAddress
    },
    loginOut() {
      this.id = ''
      this.token = ''
      this.fullName = ''
      this.inviteCode = ''
      this.publicAddress = ''
      this.role = ''
    }
  }
})
