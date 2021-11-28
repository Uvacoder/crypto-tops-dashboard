import { Footer } from './components/footer'
import { Header } from './components/header'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
