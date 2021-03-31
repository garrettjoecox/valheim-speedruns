import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { SignupForm } from 'client/theme/domains/auth/components/SignupForm';
import NextLink from 'next/link';
import React, { FC } from 'react';

export interface SignupPageProps {}

export const SignupPage: FC<SignupPageProps> = () => {
  return (
    <Flex align="center" justify="center" direction="column" minHeight="100vh">
      <Box p="8" w="400px" bg="gray.700" borderRadius="lg">
        <SignupForm />

        <Box textAlign="center" m="4">
          Already have an account?{' '}
          <Text color="orange.500" d="inline">
            <NextLink href="/login">
              <Link href="/login">Log In</Link>
            </NextLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
