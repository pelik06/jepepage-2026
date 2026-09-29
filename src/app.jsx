import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Starfield from './components/Starfield'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import OpenWhen from './pages/OpenWhen'
import EnvelopeLetter from './pages/EnvelopeLetter'
import Memories from './pages/Memories'
import Letter from './pages/Letter'
import Surprise from './pages/Surprise'
import Archive2025 from './pages/Archive2025'
import NotFound from './pages/NotFound'
import { useRouteChanged } from './hooks/usePageMeta'

/** Map a route to a body data-page (drives the per-page horizon tint). */
function pageKind(pathname) {
  if (pathname.startsWith('/open-when/')) return 'envelope'
  if (pathname.startsWith('/open-when')) return 'openwhen'
  if (pathname.startsWith('/memories')) return 'memories'
  if (pathname.startsWith('/letter')) return 'letter'
  if (pathname.startsWith('/surprise')) return 'surprise'
  if (pathname.startsWith('/2025')) return 'archive'
  return 'home'
}

export default function App() {
  const location = useLocation()
  useRouteChanged(location.pathname)

  useEffect(() => {
    document.body.dataset.page = pageKind(location.pathname)
  }, [location.pathname])

  const isSurprise = location.pathname.startsWith('/surprise')

  return (
    <ErrorBoundary>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Starfield />
      <Navbar />
      <div className="shell">
        <main id="main" className="page" tabIndex={-1} style={{ outline: 'none' }}>
          <div className="route-fade" key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/open-when" element={<OpenWhen />} />
              <Route path="/open-when/:id" element={<EnvelopeLetter />} />
              <Route path="/memories" element={<Memories />} />
              <Route path="/letter" element={<Letter />} />
              <Route path="/surprise" element={<Surprise />} />
              <Route path="/2025" element={<Archive2025 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        {!isSurprise && <Footer />}
      </div>
    </ErrorBoundary>
  )
}
