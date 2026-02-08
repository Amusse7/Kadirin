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
