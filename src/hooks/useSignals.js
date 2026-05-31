import { useEffect, useState } from 'react'
import { explainSignals, searchSignals } from '../services/api'

export function useSignals(params) {
  const paramsKey = JSON.stringify(params)
  const [data, setData] = useState(null)
  const [explainData, setExplainData] = useState(null)
  const [explainLoading, setExplainLoading] = useState(false)
  const [explainError, setExplainError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    const requestParams = JSON.parse(paramsKey)
    Promise.resolve().then(() => {
      if (!mounted) return
      setLoading(true)
      setError(null)

      searchSignals(requestParams)
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
    })

    return () => {
      mounted = false
    }
  }, [paramsKey])

  useEffect(() => {
    let mounted = true
    const requestParams = JSON.parse(paramsKey)
    Promise.resolve().then(() => {
      if (!mounted) return
      setExplainLoading(true)
      setExplainError(null)

      explainSignals(requestParams)
        .then(res => {
          if (!mounted) return
          setExplainData(res)
          setSelected(res?.signals?.[0] || null)
        })
        .catch(err => {
          if (!mounted) return
          setExplainError(err)
        })
        .finally(() => {
          if (mounted) setExplainLoading(false)
        })
    })

    return () => {
      mounted = false
    }
  }, [paramsKey])

  function selectSignal(signal) {
    setSelected(signal)
  }

  return { data, explainData, explainLoading, explainError, loading, error, selectSignal, selected }
}
