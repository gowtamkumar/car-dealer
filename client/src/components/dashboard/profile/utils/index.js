export const ColorList = ['blue', 'orange', 'green', 'blue-gray', 'purple', 'teal', 'cyan', 'red']

export const getColor = (color) => {
  switch (color) {
    case 'Gray':
      return `bg-gray-500`
    case 'Black':
      return `bg-black`
    case 'White':
      return `bg-white`
    case 'Pink':
      return `bg-pink-500`
    case 'Gold':
      return `bg-amber-500`
    case 'Blue':
      return `bg-blue-500`
    case 'Red':
      return `bg-red-500`
    case 'Silver':
      return `bg-blue-gray-200`
    case 'Brown':
      return `bg-brown-500`
    case 'Lime Green':
      return `bg-lime-500`
    case 'Purple':
      return `bg-purple-500`
    case 'Orange':
      return `bg-orange-500`
    case 'Yellow':
      return `bg-yellow-300`
    case 'Beige':
      return `bg-orange-50`
    case 'Dark Green':
      return `bg-green-900`
    case 'Green':
      return `bg-green-500`
    case 'Mica Blue':
      return `bg-indigo-500`
    case 'Sky Blue':
      return `bg-light-blue-300`
    case 'Dark Blue':
      return `bg-blue-900`
    case 'Navy Blue':
      return `bg-blue-600`
    case 'Red Wine':
      return `bg-pink-900`
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
