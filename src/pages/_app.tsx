import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';

type PageProps = {
  session?: Session;
};

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default withTRPC({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      headers: {
        'x-ssr': 'yes',
      },
    };
  },
  ssr: true,
})(App);
