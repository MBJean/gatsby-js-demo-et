import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comments/Comment'
import LoadingIcon from '../Loading/LoadingIcon'
import STYLES from './Post.module.scss'

const Post = ({ post, user }) => {

  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [showUser, setShowUser] = useState(false)

  const toggleShowComments = () => setShowComments(!showComments)

  const toggleShowUser = () => setShowUser(!showUser)

  const errorHandler = (error) => {
    // TODO: make this do more interesting things
    console.log(error)
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      if (!response.ok) throw new Error(`fetchComments error: ${response.status}`)
      const comments = await response.json()
      setComments(comments)
    }

    fetchComments().catch(error => errorHandler(error))
  }, [post]);

  return (
    <div className={STYLES.post}>
      <h3>{ post.title }</h3>
      <p>{ post.body }</p>
      <div className={STYLES.actions}>
        <button className={`${STYLES.action} ${STYLES.actionUser}`} onClick={toggleShowUser}>
          <span className="material-icons">account_circle</span>
          {
            user ?
              <span>{ user.name }</span> :
              <LoadingIcon loading={true} />
          }
        </button>
        <button className={`${STYLES.action} ${STYLES.actionComment}`} onClick={toggleShowComments}>
          <span className="material-icons">comment</span>
          {
            comments.length ?
              <span>{ comments.length }</span> :
              <LoadingIcon loading={true} />
          }
        </button>
      </div>
      {
        showUser &&
          <div className={STYLES.user}>
            <p>{ user.name } ({ user.username })</p>
            <p>{ user.email }</p>
          </div>
      }
      {
        showComments &&
          <ul className={STYLES.comments}>
            {
              comments.map(comment => (
                <Comment key={`comment-${comment.id}`} comment={comment} user={null} />
              ))
            }
          </ul>
      }
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
      geo: PropTypes.shape({
        lat: PropTypes.string.isRequired,
        lng: PropTypes.string.isRequired,
      }),
    }),
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      catchPhrase: PropTypes.string.isRequired,
      bs: PropTypes.string.isRequired,
    }),
  }),
}

export default Post
