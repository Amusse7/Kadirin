'use client'

import {
  Box,
  Heading,
  VStack,
  Link,
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import type { AnalysisResult } from '@/types'

interface Props {
  results: AnalysisResult
}

export default function LearningRoadmap({ results }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="md">Recommended Learning Path 🎯</Heading>

      <Accordion allowMultiple>
        {results.recommendedPath.map((skill, index) => {
          const resources = results.learningResources[skill] || []
          return (
            <AccordionItem key={skill}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="bold">
                      {index + 1}. {skill}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={3}>
                  {resources.map((resource, idx) => (
                    <Box
                      key={idx}
                      p={3}
                      borderWidth={1}
                      borderRadius="md"
                      bg="gray.50"
                    >
                      <Link
                        href={resource.url}
                        isExternal
                        color="blue.600"
                        fontWeight="semibold"
                      >
                        {resource.title}
                      </Link>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        {resource.platform} • {resource.type}
                      </Text>
                      {resource.isFree && (
                        <Badge colorScheme="green" mt={2}>
                          Free
                        </Badge>
                      )}
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}
