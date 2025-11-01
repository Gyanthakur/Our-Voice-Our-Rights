export function speak(text, lang='hi-IN') {
  if (!('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = 0.95
    window.speechSynthesis.speak(u)
  } catch (err) {
    console.warn('speech error', err)
  }
}
