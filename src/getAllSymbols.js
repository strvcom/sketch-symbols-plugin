import sketch from 'sketch/dom' // eslint-disable-line

export default function getAllSymbols() {
  const document = sketch.Document.getSelectedDocument()
  const symbols = document.getSymbols()

  return symbols.map(s => ({
    name: s.name,
    symbolId: s.symbolId,
  }))
}
