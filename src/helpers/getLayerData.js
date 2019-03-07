import layersMapper from './layersMapper'

export default function getLayerData(layer) {
  if (layer) {
    return {
      classType: layer._class,
      style: layer.style,
      frame: layer.frame,
      name: layer.name,
      layers: layersMapper(layer.layers),
    }
  }
  return undefined
}
