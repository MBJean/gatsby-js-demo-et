import React from 'react'
import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'
import LayoutStyles from './Layout.module.scss'

const Layout = ({ children }) => (
  <main>
    <Navigation />
    <div className={LayoutStyles.background}>
      <div className={LayoutStyles.content}>
        { children }
      </div>
    </div>
    <Footer />
  </main>
)

export default Layout
