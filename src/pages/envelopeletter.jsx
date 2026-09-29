import { useParams, Navigate, Link } from 'react-router-dom'
import { openWhenMessages } from '../content/openWhen'
import { EnvelopeRitual } from '../components/envelope'
import { usePageTitle } from '../hooks/usePageMeta'

export default function EnvelopeLetter() {
  const { id } = useParams()
  usePageTitle('Open When...')
  const letter = openWhenMessages.find((m) => m.id === id)

  if (!letter) {
    return <Navigate to="/open-when" replace />
  }

  return (
    <div className="page-inner letterview">
      <Link to="/open-when" className="letterview-back">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back to Open When...
      </Link>

      <EnvelopeRitual letter={letter} accent={letter.tint} />
    </div>
  )
}
