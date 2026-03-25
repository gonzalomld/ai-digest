import { useState, useEffect } from 'react'
import './Calendar.css'

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function Calendar({ digests, selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate + 'T00:00:00'))
    }
  }, [selectedDate])

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const today = new Date().toISOString().split('T')[0]

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let startDayOfWeek = firstDay.getDay()
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

  const days = []
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ isEmpty: true })
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const hasDigest = digests.some(digest => digest.date === dateStr)
    const isToday = dateStr === today
    const isSelected = dateStr === selectedDate

    days.push({
      day: d,
      dateStr,
      hasDigest,
      isToday,
      isSelected
    })
  }

  function handlePrevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  function handleNextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  function handleDayClick(dateStr, hasDigest) {
    if (hasDigest) {
      onDateSelect(dateStr)
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
        >
          ←
        </button>
        <h2 className="calendar-title">
          {MONTHS_ES[month]} {year}
        </h2>
        <button
          className="calendar-nav-btn"
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
        >
          →
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {WEEKDAYS.map(day => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day, index) => {
            if (day.isEmpty) {
              return <div key={`empty-${index}`} className="calendar-day empty" />
            }

            return (
              <div
                key={day.dateStr}
                className={`calendar-day ${day.hasDigest ? 'has-digest' : ''} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''}`}
                onClick={() => handleDayClick(day.dateStr, day.hasDigest)}
              >
                <div className="day-number">{day.day}</div>
                {day.hasDigest && (
                  <div className="digest-indicator">
                    <span className="digest-dot">●</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar
