/* globals log */
import sketch from 'sketch/dom' // eslint-disable-line
import layersMapper from './helpers/layersMapper'

export default function symbolTransform() {
  const document = sketch.Document.getSelectedDocument()
  const symbols = document.getSymbols()

  // log(symbols.map(s => s.name))
  // number 8 should be Cards/Card-Small
  const randomSymbol = symbols[8]
  const options = { formats: 'json', output: false }
  const sketchJson = sketch.export(randomSymbol, options)
  const wantedData = {
    backgroundColor: sketchJson.backgroundColor,
    masterFrame: sketchJson.frame,
    masterStyle: sketchJson.style,
    layers: layersMapper(sketchJson.layers),
  }

  log(sketchJson)
  log(wantedData)
}
