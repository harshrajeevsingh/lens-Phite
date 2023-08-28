import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Head from 'next/head';
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, useAccount, useSignMessage, WagmiConfig } from 'wagmi';
import {
  goerli,
  mainnet,
  polygon,
  polygonMumbai
} from 'wagmi/chains';
import { authenticate, generateChallenge } from './../utils/utils';
import { useState } from 'react';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { ToastContainer, toast } from 'react-toastify';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [polygonMumbai] : []),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://rpc.ankr.com/polygon_mumbai`
      }),
    }),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />

    
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Head>

          <title>Lens Phite</title>
          <meta
            content="Generated by @rainbow-me/create-rainbowkit"
            name="description"
          />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <main className="h-screen flex flex-col items-center justify-center bg-gray-900">
         
          <div className="mt-16 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1 className="max-w-xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-6xl  text-white font-vt">Lens Phite</h1>
            <div className="fixed bottom-0 pb-4 lg:pb-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
              <ConnectButton />
            </div>
          </div>

          <Component {...pageProps} />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  </>

  );
}

export default MyApp;