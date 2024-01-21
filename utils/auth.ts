import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getUserByClerkId(
  options?: Parameters<typeof prisma.user.findUniqueOrThrow>[0]
) {
  const { userId: clerkId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    ...options,
    where: {
      clerkId: clerkId!,
      ...options?.where,
    },
  })
  return user
}
