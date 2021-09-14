import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const Connect = (): any => {
  const { active, account, activate, deactivate } = useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  async function handleConnect() {
    await activate(injected);
  }

  function handleDisconnect() {
    deactivate();
  }

  return (
    <div>
      <button onClick={!active ? handleConnect : handleDisconnect}>
        {active ? <span>Disconnect</span> : <span>Connect To MetaMask</span>}
      </button>
      <br />
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
    </div>
  );
};

export default Connect;
