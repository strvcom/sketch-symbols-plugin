import getLayerData from './getLayerData'

export default function layersMapper(layers) {
  if (layers) {
    return layers.map(l => getLayerData(l))
  }
  return undefined
}
