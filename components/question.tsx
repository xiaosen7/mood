'use client'

import { askQuestion } from '@/utils/api'
import { FormEventHandler, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    if (typeof answer === 'string') {
      setResponse(answer)
    }

    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          disabled={loading}
          className="border-black/20 px-4 py-2 text-lg border round-lg"
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Ask a question"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
