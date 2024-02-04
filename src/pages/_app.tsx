import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'
import { ApolloProvider } from '@apollo/client'

import Layout from './layout'
import { client } from '../services/apollo-client'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ClerkProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>   
      </ApolloProvider>
    </ClerkProvider>
  )
}

export default MyApp
