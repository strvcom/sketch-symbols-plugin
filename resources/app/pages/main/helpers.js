import { split, head, map, groupBy, nth } from 'ramda'

export const getFolderName = symbol => {
  const path = split('/', symbol.name)
  const mainFolder = head(path)
  // return trim(mainFolder)
  return mainFolder
}

export const getFirstInner = symbol => {
  const path = split('/', symbol.name)
  const firstInner = nth(1, path)
  // return firstInner ? trim(firstInner) : firstInner
  return firstInner
}

// export const getSecondInner = symbol => {
//   const path = split('/', symbol.name)
//   const firstInner = nth(2, path)
//   // return firstInner ? trim(firstInner) : firstInner
//   return firstInner
// }

export const groupByFolders = symbols => groupBy(getFolderName, symbols)
export const groupFirstInner = symbols => groupBy(getFirstInner, symbols)
// export const groupSecondInner = symbols => groupBy(getSecondInner, symbols)

// unused
// export const createFolders = allSymbols => {
//   const mainFolders = map(getFolderName, allSymbols)
//   return uniq(mainFolders)
// }

// try to write the whole set tree of symbols
export const createTree = symbols => {
  const mainGroups = groupByFolders(symbols)
  const withFirstInner = map(groupFirstInner, mainGroups)
  // const withSecondInner = map(groupSecondInner, withFirstInner)

  return withFirstInner
}
