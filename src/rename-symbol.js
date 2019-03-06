/* globals */
import sketch from 'sketch' // eslint-disable-line

export default function(symbol) {
  const document = sketch.Document.getSelectedDocument()
  const symbolMaster = document.getSymbolMasterWithID(symbol.symbolId)
  symbolMaster.name = symbol.name
  return 'Symbol renamed'
}
