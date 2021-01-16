import * as React from "react"
import LoadingIconStyles from './LoadingIcon.module.scss'

const LoadingIcon = ({ loading }) => loading &&
  <span className={ LoadingIconStyles.hourglass }>
    <span className="material-icons">hourglass_full</span>
  </span>

export default LoadingIcon
