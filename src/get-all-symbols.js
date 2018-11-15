import sketch from 'sketch/dom' // eslint-disable-line

export default function getAllSymbols() {
  const document = sketch.Document.getSelectedDocument()
  const symbols = document.getSymbols()

  const logNames = something => {
    something.map(s => console.log('in the getAllSymbols()', s.name))
  }

  logNames(symbols)

  return symbols.map(s => s.name)
}
