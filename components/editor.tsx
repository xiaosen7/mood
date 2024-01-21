'use client'

import { updateEntry } from '@/utils/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

type JournalEntryWithAnalysis = JournalEntry & { analysis: Analysis | null }

const Editor = ({ entry }: { entry: JournalEntryWithAnalysis }) => {
  const [value, setValue] = useState(entry.content)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  useAutosave({
    data: value,
    onSave: async (value) => {
      if (value === entry.content) {
        return
      }

      setLoading(true)
      const data = await updateEntry(entry.id, value)
      setAnalysis(data.analysis)
      setLoading(false)
    },
    saveOnUnmount: false,
  })

  const { mood, color, subject, negative, summary } = analysis ?? {}

  const analysisData = [
    { name: 'Subject', value: subject },
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Negative',
      value: negative ? 'True' : 'False',
    },
  ]

  return (
    <div className="w-full h-full  grid grid-cols-3">
      <div className="col-span-2">
        {loading && <div>...loading</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div>
        <div className="border-l border-black/10">
          <div className="px-6 py-10" style={{ background: color }}>
            <h2 className="text-2xl">Analysis</h2>
          </div>
        </div>

        <ul>
          {analysisData.map(({ name, value }) => (
            <li
              key={name}
              className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
            >
              <span className="text-lg font-semibold">{name}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Editor
