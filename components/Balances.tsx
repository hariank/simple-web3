import { useWeb3React } from "@web3-react/core";

const Balances = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  return (
    <div>
      {active ? <span>Disconnect</span> : <span>Connect To MetaMask</span>}
    </div>
  );
};

export default Balances;
