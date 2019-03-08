/* globals log */
import layersMapper from './layersMapper'
import getSymbolData from './getSymbolData'

export default function getLayerData(layer) {
  if (layer && layer._class === 'symbolInstance') {
    const symbol = getSymbolData(layer.symbolID)
    log('inner symbol:')
    log(symbol)
    return {
      index: symbol.index,
      style: symbol.style,
      background: symbol.background,
      frame: symbol.frame,
      name: symbol.name,
      layers: layersMapper(symbol.layers),
    }
  }
  if (layer) {
    return {
      index: layer.index,
      classType: layer._class,
      style: layer.style,
      frame: layer.frame,
      name: layer.name,
      layers: layersMapper(layer.layers),
    }
  }
  return undefined
}
