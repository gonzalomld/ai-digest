import { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import DigestViewer from './components/DigestViewer'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDigest, setSelectedDigest] = useState(null)
  const [digests, setDigests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDigests()
  }, [])

  async function loadDigests() {
    setLoading(true)
    const { data, error } = await supabase
      .from('digests')
      .select('*')
      .order('date', { ascending: false })

    if (!error && data) {
      setDigests(data)
      const today = new Date().toISOString().split('T')[0]
      const todayDigest = data.find(d => d.date === today)
      if (todayDigest) {
        setSelectedDate(today)
        setSelectedDigest(todayDigest)
      } else if (data.length > 0) {
        setSelectedDate(data[0].date)
        setSelectedDigest(data[0])
      }
    }
    setLoading(false)
  }

  function handleDateSelect(date) {
    const digest = digests.find(d => d.date === date)
    setSelectedDate(date)
    setSelectedDigest(digest || null)
  }

  function handleCloseDigest() {
    setSelectedDigest(null)
    setSelectedDate(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🧠 AI Daily Digest</h1>
          <p>Resúmenes diarios de newsletters de Inteligencia Artificial</p>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando digests...</p>
          </div>
        ) : (
          <>
            <Calendar
              digests={digests}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />

            {selectedDigest && (
              <DigestViewer
                digest={selectedDigest}
                onClose={handleCloseDigest}
              />
            )}

            {selectedDate && !selectedDigest && (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p>No hay digest disponible para este día</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Gonzalo M · Resúmenes generados con Claude</p>
      </footer>
    </div>
  )
}

export default App
