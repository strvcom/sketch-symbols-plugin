import { split, head, map, groupBy, nth } from 'ramda'

export const getFolderName = symbol => {
  const path = split('/', symbol.name)
  const mainFolder = head(path)
  return mainFolder
}

export const getFirstInner = symbol => {
  const path = split('/', symbol.name)
  const firstInner = nth(1, path)
  return firstInner
}

export const groupByFolders = symbols => groupBy(getFolderName, symbols)
export const groupFirstInner = symbols => groupBy(getFirstInner, symbols)

export const createTree = symbols => {
  const mainGroups = groupByFolders(symbols)
  const withFirstInner = map(groupFirstInner, mainGroups)

  return withFirstInner
}
