import './SignalTable.css'

export default function SignalTable({ signals = [], loading, onSelect }) {
  if (loading) return <div>Loading signals...</div>
  if (!signals.length) return <div>No signals found.</div>

  return (
    <table className="signal-table">
      <thead>
        <tr>
          <th>Event</th>
          <th>PRR</th>
          <th>ROR</th>
          <th>Cases</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        {signals.map(s => (
          <tr key={s.event} onClick={() => onSelect(s)}>
            <td>{s.event}</td>
            <td>{s.prr}</td>
            <td>{s.ror}</td>
            <td>{s.n_drug_event}</td>
            <td>{s.trend?.growth_ratio ? `${(s.trend.growth_ratio * 100).toFixed(0)}%` : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
