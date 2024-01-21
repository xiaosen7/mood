const createURL = (path: string) => {
  return window.location.origin + path
}

const handleRes = async (res: Response) => {
  if (res.ok) {
    const data = await res.json()
    return data.data
  }

  return { error: true, res }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )

  return handleRes(res)
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  return handleRes(res)
}
