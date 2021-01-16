import * as React from "react"
import STYLES from './LoadingIcon.module.scss'

const LoadingIcon = ({ loading }) => loading &&
  <span className={ STYLES.hourglass }>
    <span className="material-icons">hourglass_full</span>
  </span>

export default LoadingIcon
