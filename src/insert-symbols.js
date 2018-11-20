/* globals */
import sketch from 'sketch' // eslint-disable-line

export default function(symbols) {
  const document = sketch.Document.getSelectedDocument()
  const page = document.selectedPage

  function parentCheck() {
    if (document.selectedLayers.length > 0) {
      const selected = document.selectedLayers.map(layer => layer)
      const selectedLayer = document.getLayerWithID(selected[0].id)
      const selectedLayerParent = selected[0].parent

      if (selectedLayer.type !== 'Group') {
        const newGroup = new sketch.Group({
          name: 'Created Layer',
          parent: selectedLayerParent,
          layers: [selectedLayer],
        })
        return newGroup
      }
      return selectedLayer
    }
    return page
  }

  symbols.map(s => {
    const symbolMaster = document.getSymbolMasterWithID(s)

    const newSymbolInstance = new sketch.SymbolInstance({
      parent: parentCheck(),
      symbolId: symbolMaster.symbolId,
      name: symbolMaster.name,
    })

    // newSymbolInstance.moveBackward()
    // log(newSymbolInstance.index)

    document.centerOnLayer(newSymbolInstance)
    return 'Symbol inserted'
  })
}
