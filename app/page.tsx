"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box flex="1" display="flex" alignItems="center" bg="gray.50">
      <Container maxW="container.md">
        <VStack spacing={8} align="center" textAlign="center">
          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="blue.600"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={3}
            >
              Powered by AI
            </Text>
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
              mb={4}
            >
              Find Your Skill Gaps
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              Upload your resume and job description to get personalized
              learning recommendations powered by AI
            </Text>
          </Box>

          <VStack spacing={4}>
            <Button
              colorScheme="blue"
              size="lg"
              fontSize="md"
              px={8}
              py={6}
              borderRadius="full"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
              onClick={() => router.push("/analyze")}
            >
              Get Started →
            </Button>
            <Text fontSize="sm" color="gray.500">
              No signup required • Free to use
            </Text>
          </VStack>

          <Box mt={8}>
            <VStack spacing={4}>
              <Box
                display="flex"
                gap={8}
                flexWrap="wrap"
                justifyContent="center"
              >
                <VStack spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    ✓
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    Instant Analysis
                  </Text>
                </VStack>
                <VStack spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    ��
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    Learning Resources
                  </Text>
                </VStack>
                <VStack spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    🎯
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    Personalized Roadmap
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
