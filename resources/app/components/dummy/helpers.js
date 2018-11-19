const formatName = fullName => {
  const parts = fullName.split('/')
  const name = parts.pop()
  return name
}

export default formatName
