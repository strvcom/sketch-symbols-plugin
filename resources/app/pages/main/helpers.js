import { split, head, uniq, map, groupBy } from 'ramda'

const getFolderName = symbol => {
  const path = split('/', symbol.name)
  const folderName = head(path)
  return folderName
}

export const createFolders = allSymbols => {
  const allSymbolsFolders = map(getFolderName, allSymbols)
  const filtered = uniq(allSymbolsFolders)
  return filtered
}

export const groupByFolders = symbols => groupBy(getFolderName, symbols)
