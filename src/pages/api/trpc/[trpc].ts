import trpc from '@trpc/server';
import trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { createContext } from '~/server/context';

export const appRouter = trpc.router().query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Internal Error: ', error);
    }
  },
});
