import React from 'react'
import PropTypes from 'prop-types'
import STYLES from './Comment.module.scss'

const Comment = ({ comment }) => (
  <li className={ STYLES.comment }>
    <p className={ STYLES.body }>{ comment.body }</p>
    <p className={ STYLES.commenter }>
      <span className="material-icons">face</span>
      <span>{ comment.email }</span>
    </p>
  </li>
)

Comment.propTypes = {
  comment: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
}

export default Comment
