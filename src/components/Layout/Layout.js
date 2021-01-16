import React from 'react'
import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'
import STYLES from './Layout.module.scss'

const Layout = ({ children }) => (
  <main>
    <Navigation />
    <div className={ STYLES.background }>
      <div className={ STYLES.content }>
        { children }
      </div>
    </div>
    <Footer />
  </main>
)

export default Layout
