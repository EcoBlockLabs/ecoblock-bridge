import { Chain } from 'wagmi'
import { ChainId, rpcURLs } from '../networks'

export const ecoblock: Chain = {
  id: ChainId.EcoBlock,
  name: 'EcoBlock',
  network: 'ecoblock',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [rpcURLs[ChainId.EcoBlock]!]
    },
    public: {
      http: [rpcURLs[ChainId.EcoBlock]!]
    }
  },
  blockExplorers: {
    etherscan: { name: 'Ecoscan', url: 'https://ecoscan.io' },
    default: { name: 'Ecoscan', url: 'https://ecoscan.io' }
  }
}

export const ecoblockSepolia: Chain = {
  id: ChainId.EcoBlockSepolia,
  name: 'EcoBlock Sepolia',
  network: 'ecoblock-sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [rpcURLs[ChainId.EcoBlockSepolia]!]
    },
    public: {
      http: [rpcURLs[ChainId.EcoBlockSepolia]!]
    }
  },
  blockExplorers: {
    etherscan: { name: 'Ecoscan Testnet', url: 'https://testnet.ecoscan.io' },
    default: { name: 'Ecoscan Testnet', url: 'https://testnet.ecoscan.io' }
  }
}

/**
 * For e2e testing
 */
export const localL1Network: Chain = {
  id: ChainId.Local,
  name: 'EthLocal',
  network: 'local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [rpcURLs[ChainId.Local]!]
    },
    public: {
      http: [rpcURLs[ChainId.Local]!]
    }
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: '' }
  }
}

/**
 * For e2e testing
 */
export const localL2Network: Chain = {
  id: ChainId.ArbitrumLocal,
  name: 'ArbLocal',
  network: 'arbitrum-local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [rpcURLs[ChainId.ArbitrumLocal]!]
    },
    public: {
      http: [rpcURLs[ChainId.ArbitrumLocal]!]
    }
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: '' }
  }
}
