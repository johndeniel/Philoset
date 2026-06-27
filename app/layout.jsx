import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Philoset',
  description: 'Curated engineering principles and programming philosophies.'
}

const navbar = <Navbar logo={<b>Philoset</b>} />
const footer = <Footer></Footer>

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          copyPageButton={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
