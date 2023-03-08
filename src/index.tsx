import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import merge from 'lodash.merge';

const darkThemeNextUI = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#e96211",
      primaryShadow: "#e96211",
      primarySolidHover: "#e96211",
    },
  },
});
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#e96211',
  },

} as Theme);
const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "BbX5_HGODlxiEqHPHNwIahmcLrLF6SCh" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <Provider store={store}>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} theme={myTheme}>
        <NextUIProvider theme={darkThemeNextUI}>
          <App />
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </Provider>
);
