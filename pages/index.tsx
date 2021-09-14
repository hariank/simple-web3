import Head from "next/head";
import Connect from "../components/Connect";
import Balances from "../components/Balances";
import styles from "../styles/Home.module.css";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Metamask Demo</title>
        <meta name="description" content="Metamask Demo" />
      </Head>

      <main className={styles.main}>
        <Connect />
        <br />
        <Balances />
      </main>
    </div>
  );
}

function getLibrary(provider: any): providers.Web3Provider {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function App () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}
