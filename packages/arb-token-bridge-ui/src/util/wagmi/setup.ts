import { configureChains, createClient } from 'wagmi'
import { mainnet, sepolia, bsc, bscTestnet } from '@wagmi/core/chains'
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'

import {
  ecoblock,
  ecoblockTestnet,
  localL1Network as local,
  localL2Network as arbitrumLocal
} from './wagmiAdditionalNetworks'
import { isTestingEnvironment } from '../CommonUtils'

const chainList = isTestingEnvironment
  ? [
      // mainnet, arb1, & arb nova are for network switch tests
      bsc,
      ecoblock,

      bscTestnet,
      ecoblockTestnet,

      // add local environments during testing
      local,
      arbitrumLocal
    ]
  : [bsc, ecoblock, bscTestnet, ecoblockTestnet]
console.log('chainList is: ', chainList)
const { chains, provider } = configureChains(chainList, [publicProvider()])

const appInfo = {
  appName: 'Bridge to EcoBlock'
}

const { wallets } = getDefaultWallets({
  ...appInfo,
  chains
})

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'More',
    wallets: [trustWallet({ chains }), ledgerWallet({ chains })]
  }
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export { chains, provider, appInfo, wagmiClient }
