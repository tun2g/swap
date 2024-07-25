import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ERC20_ABI } from "../../abi/erc20";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stringQueryParamsToObject } from "../../utils";

const ApprovePage = () => {
  const [params] = useSearchParams();
  const walletInformation = stringQueryParamsToObject(params.toString());

  const { address } = useAccount();

  const navigate = useNavigate();

  const {
    data: hash,
    writeContract
  } = useWriteContract();

  const { data: allowance } = useReadContract({
    abi: ERC20_ABI,
    address: walletInformation.tokenAddress as `0x${string}`,
    functionName: 'allowance',
    args: [address]
  });

  useEffect(() => {
    if (allowance as bigint < BigInt(walletInformation.amountIn || 0)) {
      writeContract({
        address: walletInformation.tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [BigInt(walletInformation.amountIn || 0)],
      })
    } else if (allowance as bigint >= BigInt(walletInformation.amountIn || 0)) {
      navigate(`/bridge?` + params.toString());
    }
  }, [allowance, address])

  useEffect(() => {
    if (hash) {
      navigate(`/bridge?hash=${hash}&` + params.toString());
    }
  }, [hash])

  return (
    <div></div>
  )
}

export default ApprovePage;