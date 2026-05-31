import { useEffect, useState } from 'react'
import { explainSignals } from '../services/api'

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

    function handleResult(res) {
      if (!mounted) return

      const signals = res.packets || []
      const transformedData = {
        ...res,
        signals,
      }

      setData(transformedData)
      setExplainData(res)
      setSelected(signals[0] || null)
    }

    Promise.resolve().then(() => {
      if (!mounted) return
      setLoading(true)
      setError(null)
      setExplainLoading(true)
      setExplainError(null)

      explainSignals(requestParams)
        .then(handleResult)
        .catch(err => {
          if (!mounted) return
          setExplainError(err)
          setError(err)
        })
        .finally(() => {
          if (mounted) {
            setLoading(false)
            setExplainLoading(false)
          }
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
