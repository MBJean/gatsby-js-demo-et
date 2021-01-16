import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comments/Comment'
import LoadingDefault from '../Loading/LoadingDefault'

const Post = (props) => {

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showUser, setShowUser] = useState(false)

  useEffect(() => {
    fetchComments().catch(error => errorHandler(error))
  }, []);

  async function fetchComments() {
    setLoading(true)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.post.id}/comments`)
    if (!response.ok) throw new Error(`fetchComments error: ${response.status}`)
    const comments = await response.json()
    setComments(comments)
    setLoading(false)
  }

  function toggleShowComments() {
    setShowComments(!showComments)
  }

  function toggleShowUser() {
    setShowUser(!showUser)
  }

  const renderedComments = comments.map((comment, index) => (
    <li key={index}>
      <Comment comment={comment} />
    </li>
  ))

  function errorHandler(error) {
    // TODO: make this do more interesting things
    console.log(error)
  }

  return (
    <div>
      <p>{ props.post.title }</p>
      <p>{ props.post.body }</p>
      {
        props.user ?
          <button onClick={toggleShowUser}>props.user.name</button> :
          <LoadingDefault loading={true} />
      }
      {
        comments ?
          <button onClick={toggleShowComments}>comments.length</button> :
          <LoadingDefault loading={true} />
        }
      <ul>
        { showComments && renderedComments }
      </ul>
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
