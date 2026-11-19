export type Accent = 'en-US' | 'en-GB'

function pickVoice(lang: Accent): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return undefined
  const exact = voices.find((v) => v.lang === lang)
  if (exact) return exact
  const prefix = lang.slice(0, 2).toLowerCase()
  const region = lang.slice(3).toLowerCase()
  const byLang = voices.find((v) => {
    const vl = v.lang.toLowerCase()
    return vl.startsWith(prefix) && vl.includes(region)
  })
  if (byLang) return byLang
  return voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
}

export function speakWord(text: string, accent: Accent) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = accent
  utter.rate = 0.95
  const voice = pickVoice(accent)
  if (voice) utter.voice = voice
  synth.speak(utter)
}

export function stopSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
