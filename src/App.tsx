import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from "wagmi";
import { config } from './wagmi/config';
import { InitRoutes } from './routes';

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <InitRoutes />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
