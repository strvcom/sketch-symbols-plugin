import { split, head, uniq, map } from 'ramda'

const getFolderName = symbol => {
  const path = split('/', symbol.name)
  const folderName = head(path)
  return folderName
}

const createFolders = allSymbols => {
  const allSymbolsFolders = map(getFolderName, allSymbols)
  const filtered = uniq(allSymbolsFolders)
  return filtered
}

export default createFolders
