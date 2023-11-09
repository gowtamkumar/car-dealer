import appConfig from '../../config'

export const metadata = {
  title: appConfig.title + ' ' + '| About',
}

export default function AboutLayout({ children }) {
  return <section className="min-h-screen">{children}</section>
}
