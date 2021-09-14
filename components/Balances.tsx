import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils, Contract } from "ethers";

import * as IERC20 from "../abis/IERC20.json";

const tokenMap = [
  ["USDC", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"],
  ["WBTC", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"],
  ["MATIC", "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"],
  ["AGLD", "0x32353a6c91143bfd6c7d363b546e62a9a2489a20"],
];

const BalanceList = (props: any): any => {
  return props.balances.map((x: Array<string>) => (
    <li key={x[0]}>
      {x[0]} {x[1]}
    </li>
  ));
};

const Balances = (): any => {
  const { account, library, chainId } = useWeb3React();

  async function getBalances() {
    let _ethBalance = await library.getBalance(account);
    let _balances = [["ETH", utils.formatEther(_ethBalance)]];

    // TODO: resolve all promises at once here
    for (const [tokenName, tokenAddress] of tokenMap) {
      let contract = new Contract(tokenAddress, IERC20.abi, library);
      let _balance = await contract.balanceOf(account);
      _balances.push([tokenName, utils.formatEther(_balance)]);
    }

    return _balances;
  }

  const [balances, setBalances] = useState();
  useEffect((): any => {
    if (account) {
      getBalances()
        .then((balances: any) => {
          setBalances(balances);
        })
        .catch((e): any => {
          console.log(e);
          setBalances(undefined);
        });
    }
    return function cleanup() {
      setBalances(undefined);
    };
  }, [account, library, chainId]);

  return (
    <div>
      <span>
        {balances != undefined ? <BalanceList balances={balances} /> : ""}
      </span>
    </div>
  );
};

export default Balances;
