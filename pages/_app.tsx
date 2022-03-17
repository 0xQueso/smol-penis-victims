import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Arbitrum } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const config: Config = {
    readOnlyChainId: Arbitrum.chainId,
    readOnlyUrls: {
        [Arbitrum.chainId]: 'https://arb-mainnet.g.alchemy.com/v2/mVQs17NB0b-jAXq1RXC99MN5U4Ds2bsF',
    },
}

function MyApp({ Component, pageProps }) {
  return(
      <ChakraProvider>
          <DAppProvider config={config}>
            <Component {...pageProps} />
          </DAppProvider>
      </ChakraProvider>
  )
}

export default MyApp
