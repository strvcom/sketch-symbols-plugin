/* globals */
import sketch from 'sketch' // eslint-disable-line

export default function(symbols) {
  const document = sketch.Document.getSelectedDocument()
  const page = document.selectedPage

  function parentCheck() {
    if (document.selectedLayers.length > 0) {
      const selected = document.selectedLayers.map(layer => layer)
      const selectedLayer = document.getLayerWithID(selected[0].id)

      if (selectedLayer.type === 'Group') {
        return selectedLayer
      }
      return selectedLayer.parent
    }
    return page
  }

  function setCoordinates(master) {
    if (document.selectedLayers.length > 0) {
      const selected = document.selectedLayers.map(layer => layer)
      const selectedLayer = document.getLayerWithID(selected[0].id)

      if (selectedLayer.type === 'Group') {
        return {
          x: 0 + selectedLayer.frame.width / 2 - master.frame.width / 2,
          y: 0 + selectedLayer.frame.height / 2 - master.frame.height / 2,
        }
      }

      return {
        x:
          selectedLayer.frame.x +
          selectedLayer.frame.width / 2 -
          master.frame.width / 2,
        y:
          selectedLayer.frame.y +
          selectedLayer.frame.height / 2 -
          master.frame.height / 2,
      }
    }

    return {
      x: page.frame.x - master.frame.width / 2,
      y: page.frame.y - master.frame.height / 2,
    }
  }

  const symbolsParent = parentCheck()

  symbols.map(s => {
    const symbolMaster = document.getSymbolMasterWithID(s)
    const coordinates = setCoordinates(symbolMaster)

    const newSymbolInstance = new sketch.SymbolInstance({
      parent: symbolsParent,
      symbolId: symbolMaster.symbolId,
      name: symbolMaster.name,
      frame: new sketch.Rectangle(
        coordinates.x,
        coordinates.y,
        symbolMaster.frame.width,
        symbolMaster.frame.height
      ),
    })

    return newSymbolInstance
  })
}
