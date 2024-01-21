'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React from 'react'

interface INewEntryCardProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function NewEntryCard(props: INewEntryCardProps) {
  const router = useRouter()

  const onClick = async () => {
    const entry = await createNewEntry()
    router.push(`/journal/${entry.id}`)
  }
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}
