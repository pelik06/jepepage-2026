// ————— Memories —————
// Replace photos (src/assets/img/mem-*.jpg) with your own pictures, keep the
// same filenames or update the imports above. Captions are handwritten style.

import mem01 from '../assets/img/mem-01-me.jpeg'
import mem02 from '../assets/img/mem-02-me.jpeg'
import mem03 from '../assets/img/mem-03-me.jpeg'
import mem04 from '../assets/img/mem-04-me.jpeg'
import mem05 from '../assets/img/mem-05-me.jpeg'

export const memoriesIntro = {
  title: 'Our Memories',
  subtitle: 'just a little closer – a little table, a lot of memories – late nights are better with you – pizza, laughter, and you – the world looks better upside down with you',
  quote: 'the best part of every picture is that you were there',
}

export const memories = [
  {
    id: 'lights',
    src: mem01,
    alt: 'A couple walking under a string of warm fairy lights at night',
    caption: 'just a little closer',
    rotation: -5,
    size: 250,
  },
  {
    id: 'cafe',
    src: mem02,
    alt: 'Two cups of hot drinks on a cafe table by a window at night',
    caption: 'a little table, a lot of memories',
    rotation: 3.5,
    size: 220,
  },
  {
    id: 'pier',
    src: mem03,
    alt: 'A couple wrapped in one blanket sitting on a pier under the stars',
    caption: 'late nights are better with you',
    rotation: -2.5,
    size: 265,
  },
  {
    id: 'shooting-star',
    src: mem04,
    alt: 'A shooting star over a calm mountain lake',
    caption: 'pizza, laughter, and you',
    rotation: 5,
    size: 235,
  },
  {
    id: 'picnic',
    src: mem05,
    alt: 'A cozy picnic blanket with fairy lights, mugs and polaroids at night',
    caption: 'the world looks better upside down with you',
    rotation: -4,
    size: 245,
  },
]
