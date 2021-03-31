import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import { LoginForm } from './components/LoginForm';

export interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  return (
    <Flex align="center" justify="center" direction="column" minHeight="100vh">
      <Box p="8" w="400px" bg="gray.700" borderRadius="lg">
        <LoginForm />

        <Box textAlign="center" m="4">
          Don't have an account?{' '}
          <Text color="orange.500" d="inline">
            <NextLink href="/signup">
              <Link href="/signup">Sign Up</Link>
            </NextLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
