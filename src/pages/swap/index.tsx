import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { stringQueryParamsToObject } from "../../utils";
import { uniswapV3Facet } from "../../config";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { ERC20_ABI } from "../../abi/erc20";
import { SEPOLIA_ROUTER_ADDRESS, SEPOLIA_UNISWAP_V3_ROUTER } from "../../constants";
import { ROUTER_ARTIFACTS } from "../../abi/router-artifacts";
import { arbitrum, arbitrumSepolia, sepolia } from "viem/chains";

export const SwapPage = ()=>{
  
  const [params] = useSearchParams();
  const walletInformation = stringQueryParamsToObject(params.toString());

  const { address, chainId, isConnecting } = useAccount();

  const { switchChain } = useSwitchChain();

  
  const { data: approveData, writeContract: approveCall } = useWriteContract();
  const { writeContract: swapCall } = useWriteContract();

  const handleSwap = () => {    
    approveCall({
      address: walletInformation.fromTokenAddress as any,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [SEPOLIA_ROUTER_ADDRESS, walletInformation.amountIn],
    });
  };

  useEffect(()=>{
    if (walletInformation.chainId && chainId !== parseInt(walletInformation.chainId)) {
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
  },[chainId, walletInformation.chainId, isConnecting])

  useEffect(()=>{
    const tokenInput = new ethers.Contract(walletInformation.fromTokenAddress!, ERC20_ABI);

    const callData = uniswapV3Facet.interface.encodeFunctionData("swapExactInputSingle", [
      {
        amountIn: walletInformation.amountIn,
        amountOutMinimum: walletInformation.amountOut,
        tokenIn: walletInformation.fromTokenAddress,
        tokenOut: walletInformation.toTokenAddress,
        recipient: address,
        uniswapPoolFee: 3000n,
      },
    ]);
    console.log('run swap')
    swapCall({
      address: SEPOLIA_ROUTER_ADDRESS,
      abi: ROUTER_ARTIFACTS.abi,
      functionName: 'swap',
      args: [
        tokenInput.address,
        walletInformation.amountIn,
        SEPOLIA_UNISWAP_V3_ROUTER,
        callData,
      ],
    });
  },[approveData])


  return (
    <>
   <div className="w-screen h-screen flex justify-center items-center">
   <button
          className={`flex items-center gap-4 border-2 border-black-400 text-black-500 rounded-xl font-semibold px-8 py-2 text-sm hover:opacity-85`}
          onClick={() => handleSwap()}
        >
          Swap
    </button>
    </div>
    </>
  )
} 

export default SwapPage;