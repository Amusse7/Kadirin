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
