import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { get } from 'http'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }: any) => {
  const { content } = await request.json()

  const user = await getUserByClerkId()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      ...analysis,
      userId: user.id,
      entryId: updatedEntry.id,
    },
    update: {
      ...analysis,
    },
  })

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  })
}
