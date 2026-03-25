import { useEffect, useRef } from 'react'
import './DigestViewer.css'

function DigestViewer({ digest, onClose }) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [digest])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
  }

  return (
    <div className="digest-viewer" ref={viewerRef}>
      <div className="digest-viewer-header">
        <div className="digest-viewer-info">
          <h2>{digest.title}</h2>
          <div className="digest-meta">
            <span className="digest-date">{formatDate(digest.date)}</span>
            {digest.source_count > 0 && (
              <span className="digest-stat">{digest.source_count} fuentes</span>
            )}
            {digest.article_count > 0 && (
              <span className="digest-stat">{digest.article_count} artículos</span>
            )}
          </div>
        </div>
        <button className="digest-close-btn" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>

      <div className="digest-content" dangerouslySetInnerHTML={{ __html: digest.content }} />
    </div>
  )
}

export default DigestViewer
