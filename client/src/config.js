const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const apiBaseUrl = process.env.API_URL || 'http://localhost:3900'

export const appConfig = {
  name: 'RMJ AUTO',
  title: 'RMJ Auto',
  description: '',
  url,
  apiBaseUrl,
  author: {
    name: 'Masud Pervez || Gowtom Kumar',
    email: 'masudpervez431@gmail.com',
    website: '',
  },
  links: {
    linkedIn: '',
    github: '',
  },
}

export const carouselData = [
  {
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '2',
  },
  {
    img: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '3',
  },
  {
    img: 'https://images.unsplash.com/photo-1549927681-0b673b8243ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '4',
  },
  {
    img: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '5',
  },
  {
    img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: '6',
  },
]

export default appConfig
