/* globals */
import sketch from 'sketch' // eslint-disable-line

export default function(symbols) {
  const document = sketch.Document.getSelectedDocument()
  const page = document.selectedPage
  const selected = document.selectedLayers.map(layer => layer)
  const selectedLayer = document.getLayerWithID(selected[0].id)
  const selectedLayerParent = selected[0].parent

  function parentCheck() {
    if (document.selectedLayers.length > 0) {
      if (selectedLayer.type !== 'Group') {
        console.log(selectedLayer.parent.type)
        // const coordinates = new sketch.Rectangle(selectedLayer.frame)

        // const newGroup = new sketch.Group({
        //   name: 'Created Layer',
        //   parent: selectedLayerParent,
        //   layers: [selectedLayer],
        //   frame: coordinates,
        // })
        // selectedLayer.frame = new sketch.Rectangle(
        //   0,
        //   0,
        //   coordinates.width,
        //   coordinates.height
        // )
        return selectedLayerParent || page
      }
      return selectedLayer
    }
    return page
  }

  const symbolsParent = parentCheck()

  symbols.map(s => {
    const symbolMaster = document.getSymbolMasterWithID(s)

    const newSymbolInstance = new sketch.SymbolInstance({
      parent: symbolsParent,
      symbolId: symbolMaster.symbolId,
      name: symbolMaster.name,
      frame: new sketch.Rectangle(
        symbolsParent.frame.width / 2 - symbolMaster.frame.width / 2,
        symbolsParent.frame.height / 2 - symbolMaster.frame.height / 2,
        symbolMaster.frame.width,
        symbolMaster.frame.height
      ),
    })

    return newSymbolInstance
  })
}
