import sketch from 'sketch' // eslint-disable-line

export default function() {
  const document = sketch.Document.getSelectedDocument()
  const page = document.selectedPage

  const symbols = document.getSymbols()

  const firstSymbol = symbols.shift()

  // Try to insert more symbols

  // const firstTwoSymbols = symbols.slice(0, 2)

  // firstTwoSymbols.map(s => {
  //   const newSymbolInstance = new sketch.SymbolInstance({
  //     parent: page,
  //     symbolId: s.symbolId,
  //     name: s.name,
  //   })
  //   document.centerOnLayer(newSymbolInstance)
  // })

  const newSymbolInstance = new sketch.SymbolInstance({
    parent: page,
    symbolId: firstSymbol.symbolId,
    name: firstSymbol.name,
  })

  document.centerOnLayer(newSymbolInstance)
}
