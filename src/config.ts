import { http, createConfig, injected } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const config = createConfig({
    connectors: [injected()],
  chains: [mainnet],
	  transports: {
	    [mainnet.id]: http(import.meta.env.VITE_ALCHEMY_URL),
  },
})

