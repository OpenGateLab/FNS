import { ethers } from 'ethers'
import { wallet } from '~/libs/wallet'
import { CONTRACT_ADDRESS } from '~~/constants'
import FNSRegistryAbi from '~~/constants/abi/FNSRegistry.json'
import IRegistrarAbi from '~~/constants/abi/IRegistrar.json'
import IRegistrarControllerAbi from '~~/constants/abi/IRegistrarController.json'
import PublicResolverAbi from '~~/constants/abi/PublicResolver.json'
import ReverseRegistrarAbi from '~~/constants/abi/ReverseRegistrar.json'

let ContractFNSRegistry = null
let ContractIRegistrar = null
let ContractIRegistrarController = null
let ContractPublicResolver = null
let ContractReverseRegistrar = null

export async function useContractFNSRegistry(readOnly = false) {
  if (readOnly) {
    return new ethers.Contract(
      CONTRACT_ADDRESS.FNSRegistry,
      FNSRegistryAbi,
      await wallet.getJsonRpcProvider()
    ) as any
  }
  if (!ContractFNSRegistry) {
    const provider = await wallet.getWeb3Provider()
    ContractFNSRegistry = new ethers.Contract(
      CONTRACT_ADDRESS.FNSRegistry,
      FNSRegistryAbi,
      provider.getSigner()
    ) as any
  }
  return ContractFNSRegistry
}

export async function useContractIRegistrar(readOnly = false) {
  if (readOnly) {
    return new ethers.Contract(
      CONTRACT_ADDRESS.Registrar,
      IRegistrarAbi,
      await wallet.getJsonRpcProvider()
    ) as any
  }
  if (!ContractIRegistrar) {
    const provider = await wallet.getWeb3Provider()
    ContractIRegistrar = new ethers.Contract(
      CONTRACT_ADDRESS.Registrar,
      IRegistrarAbi,
      provider.getSigner()
    ) as any
  }
  return ContractIRegistrar
}

export async function useContractIRegistrarController(readOnly = false) {
  if (readOnly) {
    return new ethers.Contract(
      CONTRACT_ADDRESS.RegistrarController,
      IRegistrarControllerAbi,
      await wallet.getJsonRpcProvider()
    ) as any
  }
  if (!ContractIRegistrarController) {
    const provider = await wallet.getWeb3Provider()
    ContractIRegistrarController = new ethers.Contract(
      CONTRACT_ADDRESS.RegistrarController,
      IRegistrarControllerAbi,
      provider.getSigner()
    ) as any
  }

  return ContractIRegistrarController
}

export async function useContractPublicResolver(readOnly = false) {
  if (readOnly) {
    return new ethers.Contract(
      CONTRACT_ADDRESS.PublicResolver,
      PublicResolverAbi,
      await wallet.getJsonRpcProvider()
    ) as any
  }
  if (!ContractPublicResolver) {
    const provider = await wallet.getWeb3Provider()
    ContractPublicResolver = new ethers.Contract(
      CONTRACT_ADDRESS.PublicResolver,
      PublicResolverAbi,
      provider.getSigner()
    ) as any
  }
  return ContractPublicResolver
}

export async function useContractReverseRegistrar(readOnly = false) {
  if (readOnly) {
    return new ethers.Contract(
      CONTRACT_ADDRESS.ReverseRegistrar,
      ReverseRegistrarAbi,
      await wallet.getJsonRpcProvider()
    ) as any
  }
  if (!ContractReverseRegistrar) {
    const provider = await wallet.getWeb3Provider()
    ContractReverseRegistrar = new ethers.Contract(
      CONTRACT_ADDRESS.ReverseRegistrar,
      ReverseRegistrarAbi,
      provider.getSigner()
    ) as any
  }
  return ContractReverseRegistrar
}
