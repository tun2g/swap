import { ethers } from "ethers";
import { SEPOLIA_FACTORY_ADDRESS, SEPOLIA_ROUTER_ADDRESS, SEPOLIA_UNISWAP_V3_ROUTER } from "../constants";
import { ROUTER_ARTIFACTS } from "../abi/router-artifacts";
import { FACTORY_ARTIFACTS } from "../abi/factory-artifacts";

export const swapRouterContract = new ethers.Contract(
  SEPOLIA_ROUTER_ADDRESS,
  ROUTER_ARTIFACTS.abi
);

export const swapFactoryContract = new ethers.Contract(
  SEPOLIA_FACTORY_ADDRESS,
  FACTORY_ARTIFACTS.abi
)

export const uniswapV3Facet = new ethers.Contract(
  SEPOLIA_UNISWAP_V3_ROUTER,
  FACTORY_ARTIFACTS.abi
)
