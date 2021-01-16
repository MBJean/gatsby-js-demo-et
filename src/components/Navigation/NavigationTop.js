import React from 'react'
import NavigationTopStyles from './NavigationTop.module.scss'

const NavigationTop = props => (
  <nav className={NavigationTopStyles.nav}>
    <div className={NavigationTopStyles.navBody}>
      <a href="/">Title</a>
      <ul className={NavigationTopStyles.links}>
        <li>
          <a href="#">Link 1</a>
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavigationTop
