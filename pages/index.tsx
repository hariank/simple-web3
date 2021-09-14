import Head from "next/head";
import Connect from "../components/Connect";
import Balances from "../components/Balances";
import styles from "../styles/Home.module.css";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function App() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Metamask Demo</title>
        <meta name="description" content="Metamask Demo" />
      </Head>

      <main className={styles.main}>
        <Connect />
        <Balances />
      </main>
    </div>
  );
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
