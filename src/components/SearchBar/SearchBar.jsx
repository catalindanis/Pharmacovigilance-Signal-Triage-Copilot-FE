import { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ defaultValues = {}, onSearch }) {
  const [drug, setDrug] = useState(defaultValues.drug || '')
  const [startDate, setStartDate] = useState(defaultValues.start_date || '')
  const [endDate, setEndDate] = useState(defaultValues.end_date || '')

  function submit(e) {
    e.preventDefault()
    onSearch({ drug, start_date: startDate, end_date: endDate })
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input value={drug} onChange={e => setDrug(e.target.value)} placeholder="Drug name" />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}
