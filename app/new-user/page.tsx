import { prisma } from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const syncNewUser = async () => {
  const clerkUser = (await currentUser())! // through middleware, so no null
  console.log({ clerkUser })

  const match = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress ?? '',
      },
    })
  }

  redirect('/journal')
}

export default async function NewUser() {
  await syncNewUser()
  return <>...loading</>
}
