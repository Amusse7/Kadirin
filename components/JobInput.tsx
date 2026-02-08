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
