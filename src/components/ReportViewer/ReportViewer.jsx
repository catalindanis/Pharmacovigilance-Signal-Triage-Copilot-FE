import './ReportViewer.css'

function getPacketForSignal(explainData, signal) {
  if (!explainData || !signal) return null

  return explainData.packets?.find(packet => {
    return packet.signal_index === signal.signal_index || packet.event === signal.event || packet.event_title === signal.event
  }) || null
}

export default function ReportViewer({ signal, explainData, explainLoading, explainError }) {
  const packets = explainData?.packets || []
  const packet = getPacketForSignal(explainData, signal)
  const displayedPackets = packet
    ? [packet, ...packets.filter(currentPacket => currentPacket.signal_index !== packet.signal_index)]
    : packets

  if (!signal && !explainLoading && !explainError && displayedPackets.length === 0) return null

  return (
    <div className="report-viewer" id="export-content">
      <h4>{signal ? `Representative cases for ${signal.event}` : 'Explanation response'}</h4>

      {signal && (
        <div className="signal-summary">
          <div><strong>PRR:</strong> {signal.prr}</div>
          <div><strong>ROR:</strong> {signal.ror}</div>
          <div><strong>Cases:</strong> {signal.n_drug_event}</div>
        </div>
      )}

      {explainLoading && <div>Loading explanation packet...</div>}
      {explainError && <div>Unable to load explanation packet.</div>}

      {displayedPackets.length > 0 ? (
        <section className="selected-packet">
          {displayedPackets.map(currentPacket => (
            <article className="packet-card" key={`${currentPacket.signal_index}-${currentPacket.event_title}`}>
              <h5>{currentPacket.event_title}</h5>
              <p><strong>Medical context:</strong> {currentPacket.medical_context}</p>
              <p><strong>Statistical justification:</strong> {currentPacket.statistical_justification}</p>
              <p><strong>Trend analysis:</strong> {currentPacket.trend_analysis}</p>
              <p><strong>Priority:</strong> {currentPacket.priority}</p>
              <p><strong>Next steps:</strong> {currentPacket.next_steps}</p>
            </article>
          ))}
        </section>
      ) : (
        !explainLoading && !explainError && <div>No explanation packet available for this signal.</div>
      )}

      {signal?.cases?.length ? (
        <ul>
          {signal.cases.map(c => (
            <li key={c.id}>
              <strong>{c.id}</strong> - {c.date} - {c.severity}
              <div>{c.summary}</div>
            </li>
          ))}
        </ul>
      ) : signal ? (
        <div>No example cases available.</div>
      ) : null}
    </div>
  )
}
