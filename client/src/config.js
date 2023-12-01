const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const apiBaseUrl = process.env.API_URL || 'http://localhost:3900'

export const appConfig = {
  name: 'RMJ AUTOS',
  title: 'RMJ Autos',
  description: '',
  url,
  apiBaseUrl,
  author: {
    name: 'RMJ AUTOS',
    email: 'rmjautos700@gmail.com',
    website: 'www.rmjautos.com',
  },
  links: {
    linkedIn: '',
    github: '',
  },
}

export default appConfig
