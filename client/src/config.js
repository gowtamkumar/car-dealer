const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

const apiBaseUrl = process.env.NEXT_SERVER_URL

export const appConfig = {
  name: 'Car Dealer',
  title: 'Car Dealer',
  description: '',
  url,
  apiBaseUrl,
  author: {
    name: 'Car Dealer',
    email: 'demo@gmail.com',
    website: 'www.cardealer.com',
  },
  links: {
    linkedIn: '',
    github: '',
  },
}

export default appConfig
