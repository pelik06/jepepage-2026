// ————— Site-wide settings —————
// Everything personal lives in src/content/*. Edit here, rebuild, done.

export const site = {
  brand: 'jepepage',
  // Her birthday — also used to decide whether the surprise envelope has unlocked.
  birthdayISO: '2026-09-29T00:00:00',
  // Shown on the hero and the finale. Keep the dotted style.
  dateLabel: '09 · 29 · 2026',
  // Optional names — leave '' to use the generic romantic wording.
  herName: '',
  yourName: '',
  tagline: 'a little universe, year by year',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/open-when', label: 'Open When...' },
  { to: '/memories', label: 'Memories' },
  { to: '/letter', label: 'Letter' },
  { to: '/surprise', label: 'Surprise' },
]
