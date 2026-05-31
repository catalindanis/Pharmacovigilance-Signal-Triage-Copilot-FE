import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrendChart({ signal }) {
  const monthly = signal?.trend?.monthly || []
  if (!signal) return <div>Select a signal to view trend.</div>
  if (!monthly.length) return <div>No trend data available.</div>

  const data = monthly.map(m => ({ month: m.month, count: m.count }))

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>{signal.event} — Trend</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
