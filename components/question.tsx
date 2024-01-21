'use client'

import { FormEventHandler, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          className="border-black/20 px-4 py-2 text-lg border round-lg"
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Ask a question"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
