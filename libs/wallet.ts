import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { ElNotification } from 'element-plus'
import { NoteError } from './utils'
import { useAccountStore } from '~~/store'

class Wallet {
  public provider!: any
  public jsonRpcProvider!: any
  public wallet!: any

  public async connect() {
    try {
      const web3Provider = await this.getWeb3Provider()
      if (!web3Provider) return
      
      this.bindEvents()

      if (web3Provider.provider.chainId !== 0x13a && web3Provider.provider.chainId !== '0x4cb2f') {
        await this.switchNetwork()
      }

      const chainId = await web3Provider.provider.request({ method: 'eth_chainId' })
      const accounts = await web3Provider.provider.request({ method: 'eth_requestAccounts' })
      useAccountStore().setAccount(accounts[0])
      useAccountStore().setNetwork(chainId)

    } catch (error) {
      console.error('error', error)
      ElNotification({
        title: 'Error',
        message: 'Install Metamask and connect first !',
        type: 'error'
      })
    }
  }

  public async signature(nonce: string): Promise<string | null> {
    try {
      const web3Provider = await this.getWeb3Provider()
      if (!web3Provider) return null
      const nonceBytes = ethers.utils.toUtf8Bytes(nonce.toString())
      console.log(nonce.toString(), nonceBytes)
      return await web3Provider.getSigner().signMessage(nonceBytes)
    } catch (error) {
      console.error('signature error', error)
      ElNotification({
        title: 'Error',
        message: 'Wallet signature error!',
        type: 'error'
      })
      return null
    }
  }

  public bindEvents() {
    this.provider.on('chainChanged', () => {
      NoteError('Chain Error !')
      window.location.reload()
    })

    this.provider.on('disconnect', () => {
      NoteError('Wallet disconnected !')
      window.location.reload()
    })
  }

  public disconnect() {
    const accountStore = useAccountStore()
    accountStore.setAccount('')
    accountStore.setNetwork('')
    accountStore.loginOut()
  }

  public async switchNetwork() {
    const web3Provider = await this.getWeb3Provider()
    const chainInfo = this.getChainInfo()
    await web3Provider.provider.request({
      method: 'wallet_addEthereumChain',
      params: [chainInfo]
    })
    await web3Provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13a' }] //0x4cb2f 0x13a
    })
  }

  public async getWeb3Provider() {
    if (!this.provider) {
      const _provider = (await detectEthereumProvider()) as any
      if (_provider) {
        this.provider = new ethers.providers.Web3Provider(_provider)
      }
    }

    return this.provider
  }

  public async getJsonRpcProvider() {
    if (!this.jsonRpcProvider) {
        this.jsonRpcProvider = new ethers.providers.JsonRpcProvider(this.getChainInfo().rpcUrls[0]);
    }

    return this.jsonRpcProvider
  }
  public getChainInfo() {
    return {
      chainId: '0x13a',
      chainName: 'Filecoin Mainnet',
      rpcUrls: ['https://api.node.glif.io'],
      blockExplorerUrls: ['https://filfox.info'],
      // chainId: '0x4cb2f',
      // chainName: 'Filecoin Hyperspace',
      // rpcUrls: ['https://rpc.ankr.com/filecoin_testnet'],
      // blockExplorerUrls: ['https://hyperspace.filfox.info'],
      nativeCurrency: {
        name: 'FIL',
        symbol: 'FIL',
        decimals: 18
      }
    };
  }
}

export const wallet = new Wallet()
