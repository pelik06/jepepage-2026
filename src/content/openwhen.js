// ————— Open When... envelopes —————
// Add, remove or reorder envelopes freely — the grid adapts.
// Each envelope: id (used in the URL), title lines, accent tint, phosphor icon name,
// salutation, message paragraphs, optional photo, signature.

import envHappy from '../assets/img/env-happy.jpg'
import envMiss from '../assets/img/env-miss.jpg'
import envHug from '../assets/img/env-hug.jpg'
import envSmile from '../assets/img/env-smile.jpg'
import envDown from '../assets/img/env-down.jpg'
import finaleImg from '../assets/img/finale.jpg'

export const openWhenIntro = {
  title: 'Open When...',
  subtitle: 'Different moments, same love.',
  note: 'Some messages are better when the moment asks for them — so I hid them in envelopes.',
}

export const openWhenMessages = [
  {
    id: 'happy',
    eyebrow: 'Open when',
    title: "you're happy",
    tint: '#F7B3C5',
    icon: 'Heart',
    salutation: 'Hi, my love,',
    message: [
      "If you're reading this, something good happened — and I hope it's every bit as wonderful as you deserve.",
      "I'm somewhere smiling too, you know. Your happiness has always been my favorite thing in the world; it reaches me no matter the distance.",
      'Keep this feeling. Fold it up small and keep it in your pocket for a rainy day. And tonight, when you look up, know the stars are celebrating with you.',
    ],
    photo: envHappy,
    photoAlt: 'A couple laughing and dancing under glowing paper lanterns at night',
    photoCaption: 'joy looks good on you',
    signature: 'Always yours',
    ps: 'P.S. Tell me everything later. Every single detail.',
  },
  {
    id: 'miss-me',
    eyebrow: 'Open when',
    title: 'you miss me',
    tint: '#D6B8F0',
    icon: 'PaperPlaneTilt',
    salutation: 'Hey, you,',
    message: [
      "I know it's not the same, here. The distance has a way of making everything feel a little heavier than it is.",
      "I hope this reminds you that I'm always thinking about you — in the morning, at night, and in all the small in-between moments you don't even know about.",
      'Close your eyes. Take a breath. Across every mile between us, my heart is still right beside yours.',
      "I miss you, and I can't wait to see you again.",
    ],
    photo: envMiss,
    photoAlt: 'A handwritten letter and a warm cup of tea on a rainy windowsill at night',
    photoCaption: 'thinking of you, always',
    signature: 'Always yours',
    ps: 'P.S. Distance means so little when someone means so much.',
  },
  {
    id: 'need-a-hug',
    eyebrow: 'Open when',
    title: 'you need a hug',
    tint: '#B8D8F8',
    icon: 'HandHeart',
    salutation: 'Come here,',
    message: [
      'Wrap yourself in the softest blanket you own, make something warm, and imagine my arms around you — tight, the way you like, no rush to let go.',
      "Whatever today was, you don't have to carry it alone anymore. Put it down for tonight.",
      'You are safe. You are loved. And tomorrow, you get to try again — I will be right here saying that again if you need me to.',
    ],
    photo: envHug,
    photoAlt: 'A couple sharing a warm embrace surrounded by tiny fairy lights',
    photoCaption: 'a hug, stored in advance',
    signature: 'Always yours',
    ps: 'P.S. This hug never expires. Open as often as you like.',
  },
  {
    id: 'want-to-smile',
    eyebrow: 'Open when',
    title: 'you want to smile',
    tint: '#F8D6B8',
    icon: 'Smiley',
    salutation: 'Okay so,',
    message: [
      "I need you to picture me whispering this without laughing. I'm already failing.",
      "Remember that thing you do — the little dance, when your favorite song comes on and you think nobody's watching? Yes. That one. It is, objectively, the best thing in the world.",
      'Somewhere right now I am probably doing something equally ridiculous, thinking of you, grinning like an idiot.',
      "There she is. There's that smile. There it is.",
    ],
    photo: envSmile,
    photoAlt: 'A playful couple sharing one umbrella, splashing in puddles reflecting city lights',
    photoCaption: 'certified smile manufacturer',
    signature: 'Always yours',
    ps: 'P.S. You just smiled. I knew it.',
  },
  {
    id: 'feeling-down',
    eyebrow: 'Open when',
    title: "you're feeling down",
    tint: '#B8E6D6',
    icon: 'CloudMoon',
    salutation: 'Hey,',
    message: [
      'First: breathe. In... and out. One more time. I mean it — I will wait right here.',
      "Whatever is weighing on you tonight, it doesn't stand a chance against you. I've watched you turn hard days into beautiful ones more times than I can count.",
      'The clouds always pass, my love. The moon always comes back. So do I.',
      'You are stronger than you feel right now — and you are never, ever alone in this.',
    ],
    photo: envDown,
    photoAlt: 'A lighthouse beam sweeping across a calm night sea',
    photoCaption: 'the light always comes back',
    signature: 'Always yours',
    ps: 'P.S. Tomorrow you, is already proud of tonight, you.',
  },
  {
    id: 'birthday',
    eyebrow: 'Open on',
    title: 'your birthday',
    tint: '#F7D08A',
    icon: 'Lock',
    locked: true,
    salutation: 'Happy birthday, my love,',
    message: [
      "Today is the day the universe got a little brighter — the day you arrived in it.",
      'I built you this little corner of the sky so that no matter where we are, no matter how busy life gets, you can always find your way back to something made just for you.',
      'You make life more beautiful just by being you. That is not a line — it is simply the truest thing I know how to say.',
      'I love you. Today, tomorrow, always.',
    ],
    photo: finaleImg,
    photoAlt: 'A couple watching soft pastel fireworks bloom over a lake at night',
    photoCaption: 'the universe, celebrating you',
    signature: 'Happy birthday, my love',
    ps: 'P.S. There is one more surprise waiting. Go on — you earned it.',
  },
]
