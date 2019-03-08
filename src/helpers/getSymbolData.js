import sketch from 'sketch' // eslint-disable-line

export default function(symbolID) {
  const document = sketch.Document.getSelectedDocument()
  const symbolMaster = document.getSymbolMasterWithID(symbolID)
  return symbolMaster
}
