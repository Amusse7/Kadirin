import { Providers } from '@/lib/providers'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { Box } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'Kadirin - AI-Powered Skill Gap Analyzer',
  description: 'Find your skill gaps and get personalized learning recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <Box flex="1" display="flex" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
