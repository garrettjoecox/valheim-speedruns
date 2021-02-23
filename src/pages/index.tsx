import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Link,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Category, Submission, User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { db } from 'server/services/db';

interface IncludedSubmission extends Submission {
  user: User;
}

interface IncludedCategory extends Category {
  submissions: IncludedSubmission[];
  subcategories: IncludedCategory[];
}

const Layout: FC = ({ children }) => (
  <Flex maxH="100vh" overflow="hidden" height="100vh" flexDir="column" position="relative">
    {/* <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundImage="url('/bg.png')"
      zIndex={0}
      filter="blur(20px)"
      backgroundPosition="center"
      backgroundSize="cover"
    /> */}
    <Box background="gray.700" position="relative" zIndex={1} color="white">
      <Container d="flex" h="5rem" maxW="100ch" alignItems="center">
        <Flex align="center">
          <Image src="/logoColor.png" alt="logo" width="150" height="70" />
          <Text fontWeight="900" fontSize="2rem" letterSpacing="-2px" fontFamily="fantasy">
            SpeedRuns
          </Text>
        </Flex>
        <Spacer />
        <Button variant="ghost">Login</Button>
      </Container>
    </Box>
    <Box color="white" position="relative" zIndex={1} flex={1} maxH="100%" overflowY="auto">
      <Container maxW="100ch">{children}</Container>
    </Box>
  </Flex>
);

const CategorizedLeaderboard: FC<{ data: IncludedCategory[] }> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <Box marginY="4">
      <ButtonGroup isAttached>
        {data.map((category, index) => (
          <Button
            colorScheme="orange"
            key={category.id}
            borderWidth={1}
            variant={index === activeCategory ? 'solid' : 'outline'}
            onClick={() => setActiveCategory(index)}
          >
            {category.name}
          </Button>
        ))}
      </ButtonGroup>
      {data[activeCategory] && data[activeCategory].submissionsAllowed && data[activeCategory].submissions.length && (
        <Leaderboard data={data[activeCategory].submissions} />
      )}
      {data[activeCategory] && !data[activeCategory].submissionsAllowed && data[activeCategory].subcategories && (
        <CategorizedLeaderboard data={data[activeCategory].subcategories} />
      )}
    </Box>
  );
};
const Leaderboard: FC<{ data: IncludedSubmission[] }> = ({ data }) => (
  <Box>
    <Table variant="striped" size="lg" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>Player</Th>
          <Th isNumeric>Time</Th>
          <Th>Date</Th>
          <Th isNumeric>Video</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((submission, index) => (
          <Tr key={submission.id}>
            <Td>#{index + 1}</Td>
            <Td>{submission.user.name}</Td>
            <Td isNumeric>{submission.time}</Td>
            <Td>1 Week ago</Td>
            <Td isNumeric>
              <Link href={submission.proofUrl}>
                <ViewIcon />
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

type IndexProps = {
  data: IncludedCategory[];
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async (context) => {
  const categories = await db.category.findMany({
    where: { parentCategoryId: null },
    include: {
      submissions: {
        include: {
          user: true,
        },
      },
      subcategories: {
        include: {
          submissions: {
            include: {
              user: true,
            },
          },
          subcategories: {
            include: {
              submissions: {
                include: {
                  user: true,
                },
              },
              subcategories: true,
            },
          },
        },
      },
    },
  });

  return { props: { data: categories } };
};

const Index: FC<IndexProps> = ({ data }) => (
  <Layout>
    <Box paddingY="4">
      <CategorizedLeaderboard data={data} />
    </Box>
  </Layout>
);

export default Index;
