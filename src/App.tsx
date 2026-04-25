import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from "wagmi";
import "./App.css";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReadContract } from 'wagmi';
import { AllowUSDT } from "./AllowUSDT";


const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply/>
        <AllowUSDT/>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// function TotalSupply() {
//   const { address } = useAccount(); 

//   const { data, isLoading, error } = useReadContract({
//     address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//     abi: [
//       {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "name": "balance",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     ],
//     functionName: 'balanceOf',
//     args: [address],
//     enabled: !!address  
//   })

//   if(isLoading) {
//      return <div> Loading...</div>
//   }
//   return <div>
//      Your USDT Balance is {data?.toString()}
//   </div>

// }

function TotalSupply() {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
      {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "_owner", type: "address" }],
        outputs: [{ type: "uint256" }]
      }
    ],
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address   // ✅ FIX
  });

  if (!address) {
    return <div>Please connect wallet</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      Your USDT Balance: {data ? Number(data) / 1e6 : 0}  {/* ✅ USDT decimals */}
    </div>
  );
}

function ConnectWallet() {
  const { address } = useAccount();
  const { connect } = useConnect();   // ✅ inside component
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <div>
        You are connected {address}
        <button onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }
  

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          Connect via {connector.name}
        </button>
      ))}
    </div>

    
  );
}

export default App;