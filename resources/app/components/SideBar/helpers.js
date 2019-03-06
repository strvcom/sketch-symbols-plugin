import { split, nth, map, head } from 'ramda'

export const topFolder = symbol => {
  const splitted = symbol ? split('/', symbol) : ''
  const headOfSplitted = head(splitted)

  return headOfSplitted
}

export const innerFolder = symbol => {
  const splitted = symbol ? split('/', symbol) : ''
  const withInner = `${head(splitted)}/${nth(1, splitted)}`

  return withInner
}

export const getTopFolders = symbols => map(topFolder, symbols)
export const getInnerFolders = symbols => map(innerFolder, symbols)
