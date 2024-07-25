import { Connector, useAccount, useConnect, useSwitchChain } from "wagmi";
import MetamaskIcon from "../../assets/metamask-icon.svg";
import BybitIcon from "../../assets/bybit-icon.svg";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { stringQueryParamsToObject } from "../../utils";
import { arbitrum, arbitrumSepolia, sepolia } from "viem/chains";
import { disconnect } from "wagmi/actions";
import { config } from "../../wagmi/config";

const ConnectPage = () => {
  const [params] = useSearchParams();
  const walletInformation = stringQueryParamsToObject(params.toString());

  const { isConnected, chainId, address, isReconnecting } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    (window as any).Telegram?.WebApp?.ready();
  }, []);

  useEffect(() => {
    if (
      walletInformation.chainId &&
      chainId !== parseInt(walletInformation.chainId)
    ) {
      switch (parseInt(walletInformation.chainId)) {
        case arbitrum.id:
          switchChain({ chainId: arbitrum.id });
          break;

        case arbitrumSepolia.id:
          switchChain({ chainId: arbitrumSepolia.id });
          break;

        case sepolia.id:
          switchChain({ chainId: sepolia.id });
          break;

        default:
          break;
      }
    }
  }, [walletInformation.chainId, address, walletInformation.connectorId]);

  useEffect(() => {
    if (
      (window as any).Telegram?.WebApp &&
      isConnected &&
      address &&
      !isReconnecting
      && chainId === parseInt(walletInformation.chainId!)
    ) {
      (window as any).Telegram.WebApp.sendData(JSON.stringify({ address }));
    }
  }, [address, chainId]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {
        isConnected 
        ? <SwitchAccount connectorId={walletInformation.connectorId!}/> 
        : <WalletOptions connectorId={walletInformation.connectorId!}/>}
    </div>
  );
};

const WalletOptions = ({connectorId}: {connectorId: string}) => {
  const { connectors, connect } = useConnect();
  const icon = connectorId === 'io.metamask' ? MetamaskIcon : BybitIcon;
  return connectors.map((connector) => {
    if (connector.id === connectorId) {
      return (
        <button
          className={`flex items-center gap-4 border-2 ${connectorId === 'io.metamask' ? 'border-orange-400 text-orange-500': 'border-black text-black-500'} rounded-xl font-semibold px-8 py-2 text-sm hover:opacity-85`}
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          <img className="w-[32px]" src={icon} /> Connect to{" "}
          {connector.name}
        </button>
      );
    }
  });
};

const SwitchAccount = ({connectorId}: {connectorId: string}) => {
  const { connectors, connect } = useConnect();
  const icon = connectorId === 'io.metamask' ? MetamaskIcon : BybitIcon;

  const handleSwitchAccount = async (connector: Connector) => {
    await disconnect(config);
    connect({ connector });
  };

  return connectors.map((connector) => {
    if (connector.id === connectorId) {
      return (
        <button
          className={`flex items-center gap-4 border-2 ${connectorId === 'io.metamask' ? 'border-orange text-orange-500': 'border-black-400 text-black-500'} rounded-xl font-semibold px-8 py-2 text-sm hover:opacity-85`}
          key={connector.uid}
          onClick={() => handleSwitchAccount(connector)}
        >
          <img className="w-[32px]" src={icon} /> Connect to{" "}
          {connector.name}
        </button>
      );
    }
  });
};

export default ConnectPage;
