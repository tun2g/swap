interface ISwapInformation {
  hash?: string,
  chainId?: string,
  tokenAddress?: string,
  fromTokenAddress?: string,
  toTokenAddress?: string,
  amountIn?: string,
  amountOut?: string,
  connectorId?: string,
}

export const stringQueryParamsToObject = (params: string) => {
  const arr = params.split("&");

  const obj: ISwapInformation = {};
  arr.forEach(e => Object.assign(obj, { [e.split('=')[0]]: e.split('=')[1] }));

  return obj;
}