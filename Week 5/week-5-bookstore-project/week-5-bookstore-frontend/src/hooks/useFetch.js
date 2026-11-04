import { useEffect, useState } from 'react'

// Runs fetcher(signal) whenever deps change. Returns { data, loading, error, reload }.
// The previous request is aborted when deps change or the component unmounts.
export default function useFetch(fetcher, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  return { ...state, reload: () => setReloadKey((k) => k + 1) }
}
