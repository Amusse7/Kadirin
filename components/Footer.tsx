'use client'

import { Box, Container, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={6} mt="auto">
      <Container maxW="container.xl">
        <Text textAlign="center" fontSize="sm">
          © 2026 Kadirin. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}
