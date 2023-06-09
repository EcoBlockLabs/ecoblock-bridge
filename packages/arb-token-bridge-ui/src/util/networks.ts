import { addCustomNetwork, L1Network, L2Network } from '@ecoblocklabs/ecojs'
import {
  l1Networks,
  l2Networks
} from '@ecoblocklabs/ecojs/dist/lib/dataEntities/networks'

import * as Sentry from '@sentry/react'
import { SwitchNetworkArgs } from '@wagmi/core'

import { loadEnvironmentVariableWithFallback } from './index'
import { isUserRejectedError } from './isUserRejectedError'

export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const MAINNET_INFURA_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_KEY}`
const GOERLI_INFURA_RPC_URL = `https://goerli.infura.io/v3/${INFURA_KEY}`

export enum ChainId {
  // L1
  Mainnet = 1,
  BscMainnet = 56,
  // L1 Testnets
  /**
   * Rinkeby is deprecated, but we are keeping it in order to detect it and point to Goerli instead.
   */
  Rinkeby = 4,
  Goerli = 5,
  Local = 1337,
  Sepolia = 11155111,
  BscTestnet = 97,
  // L2
  EcoBlock = 630,
  ArbitrumOne = 42161,
  ArbitrumNova = 42170,
  // L2 Testnets
  EcoBlockTestnet = 631,
  /**
   * Arbitrum Rinkeby is deprecated, but we are keeping it in order to detect it and point to Arbitrum Goerli instead.
   */
  ArbitrumRinkeby = 421611,
  ArbitrumGoerli = 421613,
  ArbitrumLocal = 412346
}

export const rpcURLs: { [chainId: number]: string } = {
  // L1
  [ChainId.Mainnet]: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
    fallback: MAINNET_INFURA_RPC_URL
  }),
  [ChainId.BscMainnet]: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_BSC_MAINNET_RPC_URL,
    fallback: MAINNET_INFURA_RPC_URL
  }),
  // L1 Testnets
  [ChainId.Goerli]: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_GOERLI_RPC_URL,
    fallback: GOERLI_INFURA_RPC_URL
  }),
  [ChainId.Sepolia]: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
    fallback: GOERLI_INFURA_RPC_URL
  }),
  [ChainId.BscTestnet]: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL,
    fallback: GOERLI_INFURA_RPC_URL
  }),
  // L2
  [ChainId.EcoBlock]: 'https://rpc.ecoblock.tech',
  [ChainId.ArbitrumOne]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.ArbitrumNova]: 'https://nova.arbitrum.io/rpc',
  // L2 Testnets
  [ChainId.EcoBlockTestnet]: 'https://rpc-testnet.ecoblock.tech',
  [ChainId.ArbitrumGoerli]: 'https://goerli-rollup.arbitrum.io/rpc'
}

export const explorerUrls: { [chainId: number]: string } = {
  // L1
  [ChainId.Mainnet]: 'https://etherscan.io',
  [ChainId.BscMainnet]: 'https://bscscan.com',
  // L1 Testnets
  [ChainId.Goerli]: 'https://goerli.etherscan.io',
  [ChainId.Sepolia]: 'https://sepolia.etherscan.io',
  [ChainId.BscTestnet]: 'https://testnet.bscscan.com',
  // L2
  [ChainId.EcoBlock]: 'https://ecoscan.io',
  [ChainId.ArbitrumNova]: 'https://nova.arbiscan.io',
  [ChainId.ArbitrumOne]: 'https://arbiscan.io',
  // L2 Testnets
  [ChainId.EcoBlockTestnet]: 'https://testnet.ecoscan.io',
  [ChainId.ArbitrumGoerli]: 'https://goerli.arbiscan.io'
}

export const getExplorerUrl = (chainId: ChainId) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return explorerUrls[chainId] ?? explorerUrls[ChainId.BscMainnet]! //defaults to etherscan, can never be null
}

export const getBlockTime = (chainId: ChainId) => {
  const network = l1Networks[chainId]
  if (!network) {
    throw new Error(`Couldn't get block time. Unexpected chain ID: ${chainId}`)
  }
  return network.blockTime
}

export const getConfirmPeriodBlocks = (chainId: ChainId) => {
  const network = l2Networks[chainId]
  if (!network) {
    throw new Error(
      `Couldn't get confirm period blocks. Unexpected chain ID: ${chainId}`
    )
  }
  return network.confirmPeriodBlocks
}

export const l2DaiGatewayAddresses: { [chainId: number]: string } = {
  [ChainId.ArbitrumOne]: '0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65',
  [ChainId.ArbitrumNova]: '0x10E6593CDda8c58a1d0f14C5164B376352a55f2F'
}

export const l2wstETHGatewayAddresses: { [chainId: number]: string } = {
  [ChainId.ArbitrumOne]: '0x07d4692291b9e30e326fd31706f686f83f331b82'
}

export const l2LptGatewayAddresses: { [chainId: number]: string } = {
  [ChainId.ArbitrumOne]: '0x6D2457a4ad276000A615295f7A80F79E48CcD318'
}

// Default L2 Chain to use for a certain chainId
export const chainIdToDefaultL2ChainId: { [chainId: number]: ChainId[] } = {
  // L1
  [ChainId.BscMainnet]: [ChainId.EcoBlock],
  // L1 Testnets
  [ChainId.BscTestnet]: [ChainId.EcoBlockTestnet],

  // L2
  [ChainId.EcoBlock]: [ChainId.EcoBlock],

  // L2 Testnets
  [ChainId.EcoBlockTestnet]: [ChainId.EcoBlockTestnet]
}

const defaultL1Network: L1Network = {
  blockTime: 10,
  chainID: 1337,
  explorerUrl: '',
  rpcUrl: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_LOCAL_ETHEREUM_RPC_URL,
    fallback: 'http://localhost:8545'
  }),
  isCustom: true,
  name: 'EthLocal',
  partnerChainIDs: [412346],
  isArbitrum: false
}

const defaultL2Network: L2Network = {
  chainID: 412346,
  confirmPeriodBlocks: 20,
  ethBridge: {
    bridge: '0x2b360a9881f21c3d7aa0ea6ca0de2a3341d4ef3c',
    inbox: '0xff4a24b22f94979e9ba5f3eb35838aa814bad6f1',
    outbox: '0x49940929c7cA9b50Ff57a01d3a92817A414E6B9B',
    rollup: '0x65a59d67da8e710ef9a01eca37f83f84aedec416',
    sequencerInbox: '0xe7362d0787b51d8c72d504803e5b1d6dcda89540'
  },
  explorerUrl: '',
  rpcUrl: loadEnvironmentVariableWithFallback({
    env: process.env.NEXT_PUBLIC_LOCAL_ARBITRUM_RPC_URL,
    fallback: 'http://localhost:8547'
  }),
  isArbitrum: true,
  isCustom: true,
  name: 'EcoBlockLocal',
  partnerChainID: 1337,
  retryableLifetimeSeconds: 604800,
  nitroGenesisBlock: 0,
  nitroGenesisL1Block: 0,
  depositTimeout: 900000,
  tokenBridge: {
    l1CustomGateway: '0x3DF948c956e14175f43670407d5796b95Bb219D8',
    l1ERC20Gateway: '0x4A2bA922052bA54e29c5417bC979Daaf7D5Fe4f4',
    l1GatewayRouter: '0x525c2aBA45F66987217323E8a05EA400C65D06DC',
    l1MultiCall: '0xDB2D15a3EB70C347E0D2C2c7861cAFb946baAb48',
    l1ProxyAdmin: '0xe1080224B632A93951A7CFA33EeEa9Fd81558b5e',
    l1Weth: '0x408Da76E87511429485C32E4Ad647DD14823Fdc4',
    l1WethGateway: '0xF5FfD11A55AFD39377411Ab9856474D2a7Cb697e',
    l2CustomGateway: '0x525c2aBA45F66987217323E8a05EA400C65D06DC',
    l2ERC20Gateway: '0xe1080224B632A93951A7CFA33EeEa9Fd81558b5e',
    l2GatewayRouter: '0x1294b86822ff4976BfE136cB06CF43eC7FCF2574',
    l2Multicall: '0xDB2D15a3EB70C347E0D2C2c7861cAFb946baAb48',
    l2ProxyAdmin: '0xda52b25ddB0e3B9CC393b0690Ac62245Ac772527',
    l2Weth: '0x408Da76E87511429485C32E4Ad647DD14823Fdc4',
    l2WethGateway: '0x4A2bA922052bA54e29c5417bC979Daaf7D5Fe4f4'
  }
}

export type RegisterLocalNetworkParams = {
  l1Network: L1Network
  l2Network: L2Network
}

const registerLocalNetworkDefaultParams: RegisterLocalNetworkParams = {
  l1Network: defaultL1Network,
  l2Network: defaultL2Network
}

export function registerLocalNetwork(
  params: RegisterLocalNetworkParams = registerLocalNetworkDefaultParams
) {
  const { l1Network, l2Network } = params

  try {
    rpcURLs[l1Network.chainID] = l1Network.rpcUrl
    rpcURLs[l2Network.chainID] = l2Network.rpcUrl

    chainIdToDefaultL2ChainId[l1Network.chainID] = [l2Network.chainID]
    chainIdToDefaultL2ChainId[l2Network.chainID] = [l2Network.chainID]

    addCustomNetwork({ customL1Network: l1Network, customL2Network: l2Network })
  } catch (error: any) {
    console.error(`Failed to register local network: ${error.message}`)
  }
}

interface IsNetwork {
  // L1
  isMainnet: boolean
  isEthereum: boolean
  // L1 Testnets
  isRinkeby: boolean
  isGoerli: boolean
  isSepolia: boolean
  // L2
  isArbitrum: boolean
  isEcoBlock: boolean
  isArbitrumOne: boolean
  isArbitrumNova: boolean
  // L2 Testnets
  isEcoBlockSepolia: boolean
  isArbitrumRinkeby: boolean
  isArbitrumGoerli: boolean
  // Testnet
  isTestnet: boolean
  // General
  isSupported: boolean
}

export function isNetwork(chainId: ChainId): IsNetwork {
  const isMainnet = chainId === ChainId.BscMainnet

  const isRinkeby = chainId === ChainId.Rinkeby
  const isGoerli = chainId === ChainId.Goerli
  const isSepolia = chainId === ChainId.Sepolia
  const isBscTestnet = chainId === ChainId.BscTestnet

  const isEcoBlock = chainId === ChainId.EcoBlock
  const isEcoBlockTestnet = chainId === ChainId.EcoBlockTestnet

  const isArbitrumOne = chainId === ChainId.ArbitrumOne
  const isArbitrumNova = chainId === ChainId.ArbitrumNova
  const isArbitrumGoerli = chainId === ChainId.ArbitrumGoerli
  const isArbitrumRinkeby = chainId === ChainId.ArbitrumRinkeby

  const isArbitrum = isEcoBlock || isEcoBlockTestnet

  const isEthereum = isMainnet || isBscTestnet

  const isTestnet = isBscTestnet || isEcoBlockTestnet

  const isSupported =
    isMainnet || isBscTestnet || isEcoBlock || isEcoBlockTestnet // is network supported on bridge

  return {
    // L1
    isMainnet,
    isEthereum: isEthereum,
    // L1 Testnets
    isRinkeby,
    isGoerli,
    isSepolia,
    // L2
    isArbitrum,
    isEcoBlock,
    isArbitrumOne,
    isArbitrumNova,
    // L2 Testnets
    isEcoBlockSepolia: isEcoBlockTestnet,
    isArbitrumRinkeby,
    isArbitrumGoerli,
    // Testnet
    isTestnet,
    // General
    isSupported
  }
}

export function getNetworkName(chainId: number) {
  switch (chainId) {
    case ChainId.Mainnet:
      return 'Mainnet'

    case ChainId.BscMainnet:
      return 'Binance Smart Chain'

    case ChainId.BscTestnet:
      return 'BNB Testnet'

    case ChainId.Sepolia:
      return 'Sepolia Testnet'

    case ChainId.Local:
      return 'Ethereum'

    case ChainId.EcoBlock:
      return 'EcoBlock'

    case ChainId.EcoBlockTestnet:
      return 'EcoBlock Testnet'

    case ChainId.ArbitrumLocal:
      return 'Arbitrum'

    default:
      return 'Unknown'
  }
}

export function getNetworkLogo(chainId: number) {
  switch (chainId) {
    // L1 networks
    case ChainId.Mainnet:
    case ChainId.Goerli:
    case ChainId.Sepolia:
      return '/images/EthereumLogo.webp'
    case ChainId.BscMainnet:
    case ChainId.BscTestnet:
      return '/images/bnb-logo.svg'

    // L2 networks
    case ChainId.EcoBlock:
    case ChainId.EcoBlockTestnet:
      return '/images/EcoBlockLogoSquare.svg'

    case ChainId.ArbitrumOne:
    case ChainId.ArbitrumGoerli:
      return '/images/ArbitrumOneLogo.svg'

    case ChainId.ArbitrumNova:
      return '/images/ArbitrumNovaLogo.svg'

    default:
      return '/images/EthereumLogo.webp'
  }
}

export function getSupportedNetworks(chainId = 0) {
  return isNetwork(chainId).isTestnet
    ? [ChainId.BscTestnet, ChainId.EcoBlockTestnet]
    : [ChainId.BscMainnet, ChainId.EcoBlock]
}

const handleSwitchNetworkNotSupported = (
  attemptedChainId: number,
  isSwitchingNetworkBeforeTx: boolean
) => {
  const isDeposit = isNetwork(attemptedChainId).isEthereum
  const targetTxName = isDeposit ? 'deposit' : 'withdraw'
  const networkName = getNetworkName(attemptedChainId)

  const message = isSwitchingNetworkBeforeTx
    ? `Please connect to ${networkName} on your wallet before signing your ${targetTxName} transaction.`
    : `Please connect to ${networkName} on your wallet.`

  // TODO: show user a nice dialogue box instead of
  // eslint-disable-next-line no-alert
  alert(message)
}

/**
 * Function to invoke when an error is thrown while attempting to switch network.
 * https://wagmi.sh/react/hooks/useSwitchNetwork#onerror-optional
 * @param error
 * @param param1 - `{ chainId: number }`
 * @param context - default value `{ isSwitchingNetworkBeforeTx: false }`
 */
export function handleSwitchNetworkError(
  error: any,
  { chainId }: SwitchNetworkArgs,
  context: unknown = { isSwitchingNetworkBeforeTx: false }
) {
  const { isSwitchingNetworkBeforeTx } = context as {
    isSwitchingNetworkBeforeTx: boolean
  }
  if (isUserRejectedError(error)) {
    return
  }
  if (error.name === 'SwitchChainNotSupportedError') {
    handleSwitchNetworkNotSupported(chainId, isSwitchingNetworkBeforeTx)
  } else {
    Sentry.captureException(error)
  }
}

/**
 * The return value will be the `context` param received by the error
 * handler of `switchNetwork`.
 *
 * Function fires before switch network function and is passed same
 * variables switch network function would receive.
 * Value returned from this function will be passed to both `onError` and
 * `onSettled` functions in event of a switch network failure.
 * https://wagmi.sh/react/hooks/useSwitchNetwork#onmutate-optional
 *
 * @returns `{ isSwitchingNetworkBeforeTx: boolean }`
 */
export function handleSwitchNetworkOnMutate({
  isSwitchingNetworkBeforeTx = false
}: {
  isSwitchingNetworkBeforeTx: boolean
}) {
  return {
    isSwitchingNetworkBeforeTx
  }
}
