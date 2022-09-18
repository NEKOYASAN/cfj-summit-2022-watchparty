import type { NextPage } from 'next';
import { Box, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

const Home: NextPage = () => {
  return (
    <Box>
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default Home;
