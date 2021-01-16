import React from 'react'
import Footer from '../Footer/Footer'
import NavigationSide from '../Navigation/NavigationSide'
import NavigationTop from '../Navigation/NavigationTop'
import LayoutStyles from './Layout.module.scss'

const Layout = ({ children }) => (
  <main>
    <div>
      <NavigationTop />
      <div className={LayoutStyles.body}>
        <NavigationSide />
        <div>
          { children }
        </div>
      </div>
      <Footer />
    </div>
  </main>
)

export default Layout
