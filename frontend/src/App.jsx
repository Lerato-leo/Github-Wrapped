import { useState } from 'react'
import axios from 'axios'
import Landing from './pages/Landing'
import Wrapped from './pages/Wrapped'
import './App.css'

function App() {
  const [wrapped, setWrapped] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateWrapped = async (username, year) => {
    setLoading(true)
    setError(null)
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.get(`${baseUrl}/wrapped?username=${username}`, {
        params: { year: year || new Date().getFullYear() }
      })
      setWrapped(response.data)
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to generate wrapped. Please try again.'
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setWrapped(null)
    setError(null)
  }

  return (
    <div className="app">
      {!wrapped ? (
        <Landing onGenerate={handleGenerateWrapped} loading={loading} error={error} />
      ) : (
        <Wrapped data={wrapped} onReset={handleReset} />
      )}
    </div>
  )
}

export default App
