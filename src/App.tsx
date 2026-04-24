import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from "wagmi";
import "./App.css";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
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