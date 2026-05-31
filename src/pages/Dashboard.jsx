import { useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import SignalTable from '../components/SignalTable/SignalTable'
import TrendChart from '../components/TrendChart/TrendChart'
import ReportViewer from '../components/ReportViewer/ReportViewer'
import ExportButton from '../components/ExportButton/ExportButton'
import { useSignals } from '../hooks/useSignals'
import './Dashboard.css'

export default function Dashboard() {
  const [params, setParams] = useState({ drug: 'ibuprofen', start_date: '2024-01-01', end_date: '2024-03-31' })
  const { data, loading, error, selectSignal, selected } = useSignals(params)

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Signal Dashboard</h1>
        <SearchBar defaultValues={params} onSearch={setParams} />
      </header>

      <main className="dashboard-main">
        <section className="signals">
          <SignalTable signals={data?.signals || []} loading={loading} onSelect={selectSignal} />
        </section>

        <aside className="trend">
          <TrendChart signal={selected} />
        </aside>
      </main>

      <ReportViewer signal={selected} />
      <div style={{ position: 'fixed', right: 24, bottom: 24 }}>
        <ExportButton filename={`signal-${selected?.event?.replace(/\s+/g,'_') || 'packet'}`} />
      </div>
    </div>
  )
}
