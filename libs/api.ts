import { utils } from 'ethers'
import { NoteError, NoteSuccess } from './utils'
import { formatTime } from './filters'
import { CONTRACT_ADDRESS } from '~~/constants'
import {
  useContractIRegistrarController,
  useContractPublicResolver,
  useContractIRegistrar,
  useContractFNSRegistry,
  useContractReverseRegistrar
} from '~~/libs/contract'
import { eventHub } from '~~/libs/event-hub'

const CoinIds = {
  FIL: 461,
  ETH: 60,
  BTC: 0,
  LTC: 2,
  DOGE: 2
}

function listenTx(tx: any) {
  if (!tx) return

  tx.wait()
    .then(({ status }: any) => {
      if (status === 1) {
        NoteSuccess('Transaction has taken effect !')
        eventHub.emit('update')
      } else {
        NoteError('Transaction failed !')
      }
    })
    .catch(console.log)
}

export default {
  async getNameInfo(name: string) {
    const Name = {
      name,
      available: false,
      address: '',
      expires: '',
      contenthash: '',
      registrant: '',
      controller: '',
      texts: {},
      coins: {}
    } as any

    const IRegistrarController = (await useContractIRegistrarController(true)) as any
    const _name = name.replace(/\.fil$/, '')
    Name.available = await this.retry(
      async () => await IRegistrarController.available(_name),
      10,
      0
    )

    if (!Name.available) {
      const PublicResolver = (await useContractPublicResolver(true)) as any
      const IRegistrar = (await useContractIRegistrar(true)) as any
      const FNSRegistry = (await useContractFNSRegistry(true)) as any
      const namehash = utils.namehash(name)

      const [controller, registrant, address, expires, contenthash] = await Promise.all([
        this.retry(async () => await FNSRegistry.owner(namehash), 10, 0),
        this.retry(
          async () => await IRegistrar.ownerOf(utils.keccak256(utils.toUtf8Bytes(_name))),
          10,
          0
        ),
        this.retry(async () => await PublicResolver['addr(bytes32,uint256)'](namehash, 461), 10, 0),
        this.retry(async () => await IRegistrarController.nameExpires(_name), 10, 0),
        this.retry(async () => await PublicResolver.contenthash(namehash), 10, 0)
      ])

      const textFeilds = [
        'email',
        'url',
        'avatar',
        'description',
        'notice',
        'keywords',
        'com.discord',
        'com.github',
        'com.reddit',
        'com.twitter',
        'org.telegram'
      ]
      const texts = await Promise.all(textFeilds.map(feild => PublicResolver.text(namehash, feild)))
      for (let index = 0; index < textFeilds.length; index++) {
        const textFeild = textFeilds[index]
        Name.texts[textFeild] = texts[index]
      }
      const coinFeilds = Object.keys(CoinIds)
      const coins = await Promise.all(
        coinFeilds.map(feild => PublicResolver['addr(bytes32,uint256)'](namehash, CoinIds[feild]))
      )
      for (let index = 0; index < coinFeilds.length; index++) {
        const coinFeild = coinFeilds[index]
        try {
          Name.coins[coinFeild] = coins[index] == '0x' ? null : utils.toUtf8String(coins[index])
        } catch {}
      }

      Name.controller = controller
      Name.registrant = registrant
      try {
        Name.address = utils.toUtf8String(address)
      } catch {}
      Name.expires = `Expires at ${formatTime(expires, 'YYYY-MM-DD HH:mm:ss')} UTC`
      Name.contenthash = contenthash
    }

    return Name
  },

  async estimateTxFee(name: string, duration: number) {
    const contract = (await useContractIRegistrarController(true)) as any
    const _name = name.replace(/\.fil$/, '')
    return await contract.rentPrice(_name, duration)
  },

  async registerName(
    name: string,
    owner: string,
    duration: number,
    fee: string,
    reverseRecord = true,
    resolver = CONTRACT_ADDRESS.PublicResolver,
    data = []
  ) {
    const contract = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    const tx = await contract.register(_name, owner, duration, resolver, data, reverseRecord, {
      value: utils.parseEther(fee)
    })
    listenTx(tx)
    return tx
  },

  async renewName(name: string, duration: number, fee: string) {
    const contract = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    const tx = await contract.renew(_name, duration, {
      value: utils.parseEther(fee)
    })
    listenTx(tx)
    return tx
  },

  async setPrimaryName(name: string) {
    // const reverseContract = (await useContractReverseRegistrar(true)) as any
    // const node = await reverseContract.node(address)
    const contract = (await useContractReverseRegistrar()) as any
    // const node = utils.namehash(address.substring(2).toLowerCase() + '.addr.reverse')
    // const gasLimit = await contract.estimateGas.setName(node, name)
    // const tx = await contract.setName(node, name, { gasLimit })
    const gasLimit = await contract.estimateGas.setName(name)
    const tx = await contract.setName(name, { gasLimit })
    listenTx(tx)
    return tx
  },

  async findClaimOwner(name: string) {
    try {
      const contract = (await useContractFNSRegistry(true)) as any
      const namehash = utils.namehash(name)
      const owner = await contract['owner(bytes32)'](namehash)
      return owner.toString()
    } catch (error) {
      console.log('findClaimOwner error', error)
      return ''
    }
  },

  async reclaim(id: string, address: string) {
    const contract = (await useContractIRegistrar()) as any
    const tx = await contract['reclaim(uint256,address)'](id, address)
    listenTx(tx)
    return tx
  },

  async setAddress(name: string, address: string) {
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract['setAddr(bytes32,uint256,bytes)'](
      namehash,
      461,
      utils.toUtf8Bytes(address),
      { value: 0 }
    )
    listenTx(tx)
    return tx
  },

  async setContent(name: string, contenthash: string) {
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract.setContenthash(namehash, utils.namehash(contenthash))
    listenTx(tx)
    return tx
  },

  async findReverseViaAddress(address: string) {
    try {
      const ReverseRegistrar = (await useContractReverseRegistrar()) as any
      const PublicResolver = (await useContractPublicResolver()) as any
      const node = await ReverseRegistrar.node(address)
      const fnsName = await PublicResolver.name(node)
      let setResolver = false
      console.log('reverse', fnsName, 'node', node)
      if (fnsName) {
        const namehash = utils.namehash(fnsName)
        const fnsAddressData = await PublicResolver['addr(bytes32,uint256)'](namehash, 461)
        if (fnsAddressData) {
          const fnsAddress = utils.toUtf8String(fnsAddressData).toLowerCase()
          if (fnsAddress === address) setResolver = true
        }
      }
      return [fnsName, setResolver]
    } catch (error) {
      console.log('get reverse error', error)
      return [null, false]
    }
  },

  async findNamesViaAddress(address: string) {
    const names = new Array()
    const IRegistrar = (await useContractIRegistrar()) as any

    const balance = await this.retry(async () => await IRegistrar.balanceOf(address), 10, 0)

    for (let index = 0; index < balance; index++) {
      const tokenId = await this.retry(
        async () => await IRegistrar.tokenOfOwnerByIndex(address, index),
        10,
        0
      )
      names.push({
        tokenId,
        name:
          (await this.retry(async () => await IRegistrar['name(uint256)'](tokenId), 10, 0)) + '.fil'
      })
    }
    return names
  },
  async retry(fn: any, times: number, delay: number) {
    let err: any
    for (let i = 0; i < times; i++) {
      try {
        return await fn()
      } catch (error) {
        err = error
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    throw err
  },
  async setTexts(name: string, texts: any) {
    const fields = Object.keys(texts)
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract.multicall(
      fields.map(field =>
        contract.interface.encodeFunctionData(
          contract.interface.functions['setText(bytes32,string,string)'],
          [namehash, field, texts[field]]
        )
      )
    )
    listenTx(tx)
    return tx
  },

  async setAddresss(name: string, address: any) {
    const fields = Object.keys(address)
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract.multicall(
      fields.map(field =>
        contract.interface.encodeFunctionData(
          contract.interface.functions['setAddr(bytes32,uint256,bytes)'],
          [namehash, CoinIds[field], utils.toUtf8Bytes(address[field])]
        )
      )
    )
    listenTx(tx)
    return tx
  }
}
