import { http, createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia, sepolia],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
  },
})