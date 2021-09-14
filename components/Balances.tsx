import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";

const Balances = (): any => {
  const { active, account, library, chainId } = useWeb3React();

  async function getEtherBalance() {
    return library.getBalance(account);
  }

  const [balance, setBalance] = useState();
  useEffect((): any => {
    if (account) {
      getEtherBalance()
        .then((balance: any) => {
          setBalance(balance);
        })
        .catch((): any => {
          setBalance(undefined);
        });
    }
    return function cleanup() {
      setBalance(undefined);
    };
  }, [account, library, chainId]);

  return (
    <div>
      Ether:
      <span>{balance != undefined ? utils.formatEther(balance) : ""}</span>
    </div>
  );
};

export default Balances;
