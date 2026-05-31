import './ReportViewer.css'

function getPacketForSignal(explainData, signal) {
  if (!explainData || !signal) return null

  return explainData.packets?.find(packet => {
    return packet.signal_index === signal.signal_index || packet.event === signal.event || packet.event_title === signal.event
  }) || null
}

export default function ReportViewer({ signal, explainData, explainLoading, explainError }) {
  if (!signal) return null

  const packet = getPacketForSignal(explainData, signal)
  const otherPackets = explainData?.packets?.filter(currentPacket => {
    return currentPacket.signal_index !== packet?.signal_index
  }) || []

  return (
    <div className="report-viewer" id="export-content">
      <h4>Representative cases for {signal.event}</h4>
      <div className="signal-summary">
        <div><strong>PRR:</strong> {signal.prr}</div>
        <div><strong>ROR:</strong> {signal.ror}</div>
        <div><strong>Cases:</strong> {signal.n_drug_event}</div>
      </div>
      {explainLoading && <div>Loading explanation packet...</div>}
      {explainError && <div>Unable to load explanation packet.</div>}
      {packet ? (
        <section className="selected-packet">
          <h5>{packet.event_title}</h5>
          <p><strong>Medical context:</strong> {packet.medical_context}</p>
          <p><strong>Statistical justification:</strong> {packet.statistical_justification}</p>
          <p><strong>Trend analysis:</strong> {packet.trend_analysis}</p>
          <p><strong>Priority:</strong> {packet.priority}</p>
          <p><strong>Next steps:</strong> {packet.next_steps}</p>
        </section>
      ) : (
        !explainLoading && !explainError && <div>No explanation packet available for this signal.</div>
      )}

      {otherPackets.length > 0 && (
        <section className="other-packets">
          <h5>Other packets</h5>
          <div className="other-packets-list">
            {otherPackets.map(currentPacket => (
              <article className="packet-card" key={`${currentPacket.signal_index}-${currentPacket.event_title}`}>
                <h6>{currentPacket.event_title}</h6>
                <p><strong>Medical context:</strong> {currentPacket.medical_context}</p>
                <p><strong>Statistical justification:</strong> {currentPacket.statistical_justification}</p>
                <p><strong>Trend analysis:</strong> {currentPacket.trend_analysis}</p>
                <p><strong>Priority:</strong> {currentPacket.priority}</p>
                <p><strong>Next steps:</strong> {currentPacket.next_steps}</p>
              </article>
            ))}
          </div>
        </section>
      )}

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
