import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Flex, Spinner, Heading, ThemeProvider, Container } from "theme-ui";
import { Wallet } from "@ethersproject/wallet";

import {
  BrowserRouter,
  Redirect,
  // HashRouter,
  Route,
  Switch,
} from 'react-router-dom'

import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  // ThemeProvider
} from '@material-ui/core'

import { BatchedWebSocketAugmentedWeb3Provider } from "@liquity/providers";
import { Decimal, Difference, Trove } from "@liquity/lib-base";
import { LiquityStoreProvider } from "@liquity/lib-react";

import { LiquityProvider, useLiquity } from "./hooks/LiquityContext";
import { WalletConnector } from "./components/WalletConnector";
import { TransactionProvider, TransactionMonitor } from "./components/Transaction";
import { UserAccount } from "./components/UserAccount";
import { SystemStatsPopup } from "./components/SystemStatsPopup";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getConfig } from "./config";
import theme from "./theme";

import { DisposableWalletProvider } from "./testUtils/DisposableWalletProvider";
import { PageSwitcher } from "./pages/PageSwitcher";

import IndexHome from './pages/new-ui/IndexHome'
import FrontendRegistration from './pages/new-ui/FrontendRegistration'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  })
)

if (window.ethereum) {
  // Silence MetaMask warning in console
  Object.assign(window.ethereum, { autoRefreshOnNetworkChange: false });
}

if (process.env.REACT_APP_DEMO_MODE === "true") {
  const ethereum = new DisposableWalletProvider(
    `http://${window.location.hostname}:8545`,
    "0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7"
  );

  Object.assign(window, { ethereum });
}

// Start pre-fetching the config
getConfig().then(config => {
  // console.log("Frontend config:");
  // console.log(config);
  Object.assign(window, { config });
});

const EthersWeb3ReactProvider: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={provider => new BatchedWebSocketAugmentedWeb3Provider(provider)}>
      {children}
    </Web3ReactProvider>
  );
};

type LiquityFrontendProps = {
  loader?: React.ReactNode;
};

const LiquityFrontend: React.FC<LiquityFrontendProps> = ({ loader,children }) => {
  const { account, provider, liquity } = useLiquity();
  const classes = useStyles()

  // For console tinkering ;-)
  Object.assign(window, {
    account,
    provider,
    liquity,
    Trove,
    Decimal,
    Difference,
    Wallet
  });

  return (
    <LiquityStoreProvider {...{ loader }} store={liquity.store}>
      {children}
    </LiquityStoreProvider>
  );
};

const App = () => {
  const loader = (
    <Flex sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Spinner sx={{ m: 2, color: "text" }} size="32px" />
      <Heading>Loading...</Heading>
    </Flex>
  );

  const unsupportedNetworkFallback = (chainId: number) => (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center"
      }}
    >
      <Heading sx={{ mb: 3 }}>
        Liquity is not yet deployed to {chainId === 1 ? "mainnet" : "this network"}.
      </Heading>
      Please switch to Ropsten, Rinkeby, Kovan or Görli.
    </Flex>
  );

  return (
    <EthersWeb3ReactProvider>
      <ThemeProvider theme={theme}>
        <WalletConnector {...{ loader }}>
          <LiquityProvider {...{ loader, unsupportedNetworkFallback }}>
            <TransactionProvider>
              {/* <LiquityFrontend {...{ loader }} /> */}
              <BrowserRouter>
                <Switch>
                  <LiquityFrontend {...{ loader }}>
                    <Route
                      render={() => (
                        <>
                          <Route path="/" exact component={IndexHome} />
                          <Route path="/registration" component={FrontendRegistration} />
                          {/* <Route path="/borrowing" component={Borrowing} />
                          <Route path="/liquidation" component={Liquidation} />
                          <Route path="/pledge" component={Pledge} />
                          <Route path="/stablePool" component={StablePool} />
                          //  */}
                        </>
                      )}
                    />
                  </LiquityFrontend>
                  {/* <Redirect from="*" to='/'/> */}
                </Switch>
              </BrowserRouter>
            </TransactionProvider>
          </LiquityProvider>
        </WalletConnector>
      </ThemeProvider>
    </EthersWeb3ReactProvider>
  );
};

export default App;
