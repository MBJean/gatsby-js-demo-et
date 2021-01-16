import React from 'react'
import PropTypes from 'prop-types'
import './Comment.module.scss'

const Comment = (props) => (
  <div>
    <p>{ props.comment.name }</p>
    <p>{ props.comment.body }</p>
  </div>
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
