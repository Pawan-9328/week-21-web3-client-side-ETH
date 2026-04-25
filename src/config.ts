import { http, createConfig, injected } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const config = createConfig({
    connectors: [injected()],
  chains: [mainnet],
	  transports: {
	    [mainnet.id]: http('https://eth.llamarpc.com'),
  },
})

// import.meta.env.VITE_ALCHEMY_URL)