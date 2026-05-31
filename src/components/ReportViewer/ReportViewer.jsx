import './ReportViewer.css'

export default function ReportViewer({ signal }) {
  if (!signal) return null

  return (
    <div className="report-viewer" id="export-content">
      <h4>Representative cases for {signal.event}</h4>
      <div className="signal-summary">
        <div><strong>PRR:</strong> {signal.prr}</div>
        <div><strong>ROR:</strong> {signal.ror}</div>
        <div><strong>Cases:</strong> {signal.n_drug_event}</div>
      </div>
      {signal.cases && signal.cases.length ? (
        <ul>
          {signal.cases.map(c => (
            <li key={c.id}>
              <strong>{c.id}</strong> — {c.date} — {c.severity}
              <div>{c.summary}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No example cases available.</div>
      )}
    </div>
  )
}
