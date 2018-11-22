/* globals */
import sketch from 'sketch' // eslint-disable-line

export default function(symbols) {
  const document = sketch.Document.getSelectedDocument()
  const page = document.selectedPage

  /* This function checks for parent we need to use based on a current selection if any and returns it for later use */
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

  /* We need to expose this because it gets updated */
  let offset = 0

  /* Here we need to figure out, where the symbol gets placed. Its based on current selection (if any) which becomes its parent. Also we need to offset each symbol on Y coordinates if there are multiple symbols inserded */
  function setCoordinates(master) {
    const masterWidth = master.frame.width
    const masterHeight = master.frame.height

    let parentMiddleX = 0
    let parentMiddleY = 0

    const coordinates = {
      x: 0,
      y: 0,
    }

    /* We need to check if user has selected some layer or group otherwise the page will be a parent for new symbol instance */
    if (document.selectedLayers.length > 0) {
      const selected = document.selectedLayers.map(layer => layer)
      const selectedLayer = document.getLayerWithID(selected[0].id)

      /* If the selection is a group already we need to place the symbol inside the group */
      if (selectedLayer.type === 'Group') {
        parentMiddleX = selectedLayer.frame.width / 2
        parentMiddleY = selectedLayer.frame.height / 2

        if (offset === 0) {
          coordinates.x = parentMiddleX - masterWidth / 2
          coordinates.y = parentMiddleY - masterHeight / 2
          offset = masterHeight / 2

          return coordinates
        }

        coordinates.x = parentMiddleX - masterWidth / 2
        coordinates.y = parentMiddleY + offset + 5
        offset = offset + 5 + masterHeight

        return coordinates
      }

      /* If the selection is not a group we need to calcualte its posiction which is based upon its parrent */
      parentMiddleX = selectedLayer.frame.x + selectedLayer.frame.width / 2
      parentMiddleY = selectedLayer.frame.y + selectedLayer.frame.height / 2

      if (offset === 0) {
        coordinates.x = parentMiddleX - masterWidth / 2
        coordinates.y = parentMiddleY - masterHeight / 2
        offset = masterHeight / 2

        return coordinates
      }

      coordinates.x = parentMiddleX - masterWidth / 2
      coordinates.y = parentMiddleY + offset + 5
      offset = offset + 5 + masterHeight

      return coordinates
    }

    /* If there is no selection at all it defaults to current page */
    parentMiddleX = page.frame.x
    parentMiddleY = page.frame.y

    if (offset === 0) {
      coordinates.x = parentMiddleX - masterWidth / 2
      coordinates.y = parentMiddleY - masterHeight / 2
      offset = masterHeight / 2

      return coordinates
    }

    coordinates.x = parentMiddleX - masterWidth / 2
    coordinates.y = parentMiddleY + offset + 5
    offset = offset + 5 + masterHeight

    return coordinates
  }

  const symbolsParent = parentCheck()

  /* The main iterator function which iserts each symbol */
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

  return `Symbols inserted`
}
