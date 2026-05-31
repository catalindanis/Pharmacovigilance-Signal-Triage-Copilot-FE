import { useEffect, useState } from 'react'
import { searchSignals } from '../services/api'

export function useSignals(params) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    searchSignals(params)
      .then(res => {
        if (!mounted) return
        setData(res)
        setSelected(res?.signals?.[0] || null)
      })
      .catch(err => {
        if (!mounted) return
        setError(err)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [JSON.stringify(params)])

  function selectSignal(signal) {
    setSelected(signal)
  }

  return { data, loading, error, selectSignal, selected }
}
