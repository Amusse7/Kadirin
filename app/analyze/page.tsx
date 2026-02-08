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
