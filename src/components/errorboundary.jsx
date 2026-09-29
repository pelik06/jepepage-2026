import { Component } from 'react'

/** Keeps one broken branch from blanking the whole universe. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // surface the cause in the console so it can be diagnosed from devtools
    console.error('jepepage crashed:', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            padding: '24px',
            fontFamily: 'Georgia, serif',
            color: '#c8c2e8',
          }}
        >
          <div>
            <p style={{ fontSize: 26, marginBottom: 12 }}>a star flickered out...</p>
            <p style={{ fontSize: 15, opacity: 0.8, maxWidth: 420, lineHeight: 1.6 }}>
              Something went wrong while rendering this page. Try reloading —
              if it keeps happening, the details are in the browser console.
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
