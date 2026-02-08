'use client'

import {
  Box,
  Badge,
  Heading,
  VStack,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react'
import type { AnalysisResult } from '@/types'

interface Props {
  results: AnalysisResult
}

export default function SkillGapResults({ results }: Props) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'red'
      case 'important':
        return 'orange'
      default:
        return 'blue'
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={4}>
          Your Existing Skills ✅
        </Heading>
        <HStack wrap="wrap" spacing={2}>
          {results.existingSkills.map((skill) => (
            <Badge key={skill} colorScheme="green" fontSize="sm" px={3} py={1}>
              {skill}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={4}>
          Skills to Develop 📚
        </Heading>
        <VStack spacing={4} align="stretch">
          {results.skillGaps.map((gap) => (
            <Box
              key={gap.skill}
              p={4}
              borderWidth={1}
              borderRadius="md"
              borderColor={`${getPriorityColor(gap.priority)}.200`}
            >
              <HStack justify="space-between" mb={2}>
                <Heading size="sm">{gap.skill}</Heading>
                <Badge colorScheme={getPriorityColor(gap.priority)}>
                  {gap.priority}
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Current: {gap.currentLevel} → Target: {gap.targetLevel}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Estimated: {gap.estimatedHours} hours
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box bg="blue.50" p={4} borderRadius="md">
        <Text fontWeight="bold">
          Total Learning Time: ~{results.totalEstimatedHours} hours
        </Text>
      </Box>
    </VStack>
  )
}
