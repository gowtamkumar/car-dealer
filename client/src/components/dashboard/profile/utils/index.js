export const ColorList = ['blue', 'orange', 'green', 'blue-gray', 'purple', 'teal', 'cyan', 'red']

export const getColor = (color) => {
  switch (color) {
    case 'blue':
      return `blue`
    case 'orange':
      return `orange`
    case 'green':
      return `green`
    case 'blue-gray':
      return `blue-gray`
    case 'purple':
      return `purple`
    case 'teal':
      return `teal`
    case 'cyan':
      return `cyan`
    case 'red':
      return `red`
    default:
      return `blue`
  }
}

export const getBgColor = (color) => {
  switch (color) {
    case 'blue':
      return `bg-gradient-to-tr from-blue-100 to-blue-300`
    case 'orange':
      return `bg-gradient-to-tr from-orange-100 to-orange-300`
    case 'green':
      return `bg-gradient-to-tr from-green-100 to-green-300`
    case 'blue-gray':
      return `bg-gradient-to-tr from-blue-gray-100 to-blue-gray-300`
    case 'purple':
      return `bg-gradient-to-tr from-purple-100 to-purple-300`
    case 'teal':
      return `bg-gradient-to-tr from-teal-100 to-teal-300`
    case 'cyan':
      return `bg-gradient-to-tr from-cyan-100 to-cyan-300`
    case 'red':
      return `bg-gradient-to-tr from-red-100 to-red-300`
    default:
      return `bg-gradient-to-tr from-blue-100 to-blue-300`
  }
}
