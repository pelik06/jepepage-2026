/* Tiny inline icon set — 1.7px monoline strokes, currentColor.
   Only the glyphs the site needs; no icon library dependency. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function EnvelopeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

export function ImagesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="6" y="3.5" width="14.5" height="14.5" rx="2.5" />
      <path d="M3 8v9.5A3.5 3.5 0 0 0 6.5 21H17" />
      <circle cx="11" cy="9" r="1.6" />
      <path d="m6.5 16.5 4-4 3.5 3.5 2.5-2.5 3.5 3.5" />
    </svg>
  )
}

export function HeartStraightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 20.5S3.5 15.5 3.5 9.6C3.5 6.8 5.7 4.5 8.4 4.5c1.5 0 2.8.7 3.6 1.8.8-1.1 2.1-1.8 3.6-1.8 2.7 0 4.9 2.3 4.9 5.1 0 5.9-8.5 10.9-8.5 10.9Z" />
    </svg>
  )
}

export function GiftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="4" y="8" width="16" height="4" rx="1" />
      <path d="M6 12v8.5h12V12M12 8v12.5" />
      <path d="M12 8s-4.6.2-5.4-2C6 4.3 7.6 3 9 3.4c1.9.5 3 4.6 3 4.6Zm0 0s4.6.2 5.4-2C18 4.3 16.4 3 15 3.4c-1.9.5-3 4.6-3 4.6Z" />
    </svg>
  )
}

export function HeartFill(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden {...props}>
      <path d="M12 20.5S3.5 15.5 3.5 9.6C3.5 6.8 5.7 4.5 8.4 4.5c1.5 0 2.8.7 3.6 1.8.8-1.1 2.1-1.8 3.6-1.8 2.7 0 4.9 2.3 4.9 5.1 0 5.9-8.5 10.9-8.5 10.9Z" />
    </svg>
  )
}

export function PaperPlaneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20.5 3.5 3.8 9.9c-.9.3-.8 1.6.1 1.9l6 1.8c.4.1.7.4.8.8l1.8 6c.3.9 1.6 1 1.9.1l6.4-16.7c.3-.8-.5-1.6-1.3-1.3Z" />
      <path d="m10.7 14.4 9.8-10.9" />
    </svg>
  )
}

export function HandHeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.5 13.5 9 9.7c1-.8 2.4-.8 3.3.1l.7.7" />
      <path d="m9.5 14.9 1.4 1.2c.8.6 1.9.6 2.7 0l4.9-4" />
      <path d="M3 12.2 4.5 13.5v5L3 20M21 11.5l-2.5 2" />
      <path d="M13.7 3.9c.4-.6 1.1-.9 1.8-.9 1.2 0 2.1.9 2.1 2.1 0 2.3-3.9 4.7-3.9 4.7s-3.9-2.4-3.9-4.7c0-1.2.9-2.1 2.1-2.1.7 0 1.4.3 1.8.9Z" />
    </svg>
  )
}

export function SmileyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 14s1.2 1.8 3.5 1.8 3.5-1.8 3.5-1.8" />
      <path d="M9.2 9.6h.01M14.8 9.6h.01" strokeWidth="2.4" />
    </svg>
  )
}

export function CloudMoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M13.5 4.5a5 5 0 0 0 6 6 5 5 0 0 1-6-6Z" />
      <path d="M19 13.5a5.5 5.5 0 0 1-6.8 6.9H8a4.5 4.5 0 0 1-.4-9 5.5 5.5 0 0 1 2.8-3.2" />
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 14.5v2" />
    </svg>
  )
}

export function ListIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function ReplayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 5v5h5" />
      <path d="M4.6 13.5a8 8 0 1 0 1.7-6L4 10" />
    </svg>
  )
}

export const envelopeIconMap = {
  Heart: HeartFill,
  PaperPlaneTilt: PaperPlaneIcon,
  HandHeart: HandHeartIcon,
  Smiley: SmileyIcon,
  CloudMoon: CloudMoonIcon,
  Lock: LockIcon,
}
