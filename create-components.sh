#!/bin/bash

# components/ResumeUpload.tsx
cat > components/ResumeUpload.tsx << 'RESUME'
'use client'

import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  onFileSelect: (file: File) => void
}

export default function ResumeUpload({ onFileSelect }: Props) {
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  return (
    <FormControl>
      <FormLabel>Upload Resume (PDF or DOCX)</FormLabel>
      <Input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        display="none"
        id="resume-upload"
      />
      <Button
        as="label"
        htmlFor="resume-upload"
        colorScheme="blue"
        variant="outline"
        cursor="pointer"
        w="full"
      >
        {fileName || 'Choose File'}
      </Button>
      {fileName && (
        <Text mt={2} fontSize="sm" color="gray.600">
          Selected: {fileName}
        </Text>
      )}
    </FormControl>
  )
}
RESUME

# components/JobInput.tsx
cat > components/JobInput.tsx << 'JOB'
'use client'

import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function JobInput({ value, onChange }: Props) {
  return (
    <FormControl>
      <FormLabel>Job Description</FormLabel>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        minH="200px"
        resize="vertical"
      />
    </FormControl>
  )
}
JOB

# components/SkillGapResults.tsx
cat > components/SkillGapResults.tsx << 'RESULTS'
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
RESULTS

# components/LearningRoadmap.tsx
cat > components/LearningRoadmap.tsx << 'ROADMAP'
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
ROADMAP

# app/analyze/page.tsx
cat > app/analyze/page.tsx << 'ANALYZE'
'use client'

import {
  Container,
  VStack,
  Heading,
  Button,
  useToast,
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'
import ResumeUpload from '@/components/ResumeUpload'
import JobInput from '@/components/JobInput'
import SkillGapResults from '@/components/SkillGapResults'
import LearningRoadmap from '@/components/LearningRoadmap'
import type { AnalysisResult } from '@/types'

export default function AnalyzePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      toast({
        title: 'Missing information',
        description: 'Please upload your resume and paste the job description',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      formData.append('jobDescription', jobDescription)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResults(data)

      toast({
        title: 'Analysis complete!',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze. Please try again.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Skill Gap Analysis</Heading>

        <VStack spacing={6} align="stretch">
          <ResumeUpload onFileSelect={setResumeFile} />
          <JobInput value={jobDescription} onChange={setJobDescription} />

          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleAnalyze}
            isLoading={isLoading}
            loadingText="Analyzing..."
          >
            Analyze Skill Gaps
          </Button>
        </VStack>

        {results && (
          <>
            <Divider />
            <SkillGapResults results={results} />
            <Divider />
            <LearningRoadmap results={results} />
          </>
        )}
      </VStack>
    </Container>
  )
}
ANALYZE

# app/api/analyze/route.ts
cat > app/api/analyze/route.ts << 'API'
import { NextRequest, NextResponse } from 'next/server'
import { parseResume } from '@/lib/parsers'
import { analyzeSkillGap } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const resumeFile = formData.get('resume') as File
    const jobDescription = formData.get('jobDescription') as string

    if (!resumeFile || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing resume or job description' },
        { status: 400 }
      )
    }

    const resumeText = await parseResume(resumeFile)
    const analysis = await analyzeSkillGap(resumeText, jobDescription)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze skill gaps' },
      { status: 500 }
    )
  }
}
API

echo "All components and pages created successfully!"
