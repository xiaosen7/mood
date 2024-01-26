import { HistoryChart } from '@/components/history-chart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce(
    (acc, { sentimentScore }) => acc + sentimentScore,
    0
  )
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg, sum }
}

const History = async () => {
  const { analyses, avg } = await getData()
  console.log({ analyses })
  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
