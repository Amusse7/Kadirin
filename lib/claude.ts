import Anthropic from '@anthropic-ai/sdk'
import type { AnalysisResult } from '@/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function analyzeSkillGap(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const prompt = `You are a career transition advisor. Analyze the following resume and job description to identify skill gaps.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Please provide a detailed analysis in JSON format with:
1. skillGaps: Array of skills needed with priority (critical/important/nice-to-have), currentLevel, targetLevel, and estimatedHours to learn
2. existingSkills: Array of skills the candidate already has that match the job
3. learningResources: Object mapping each skill gap to 2-3 recommended free learning resources with title, url, type, platform, and isFree
4. totalEstimatedHours: Sum of all learning hours
5. recommendedPath: Ordered array of skills to learn (prerequisites first)

Return ONLY valid JSON, no markdown formatting, no code fences, no additional text.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    // Remove markdown code fences if present
    let jsonText = content.text.trim()
    
    // Remove ```json and ``` if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```json?\s*\n?/, '').replace(/\n?```\s*$/, '')
    }
    
    return JSON.parse(jsonText)
  }

  throw new Error('Unexpected response format')
}
