import React, { useEffect, useState } from 'react'
import LoadingDefault from '../Loading/LoadingDefault'
import Post from './Post'
import PostsStyles from './Posts.module.scss'

const Posts = props => {

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})

  useEffect(() => {
    fetchPosts().catch(error => errorHandler(error))
  }, []);

  async function fetchPosts() {
    setLoading(true)
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!postsResponse.ok) throw new Error(`fetchPosts error: ${postsResponse.status}`)
    const posts = await postsResponse.json()
    const userIds = posts.map(post => post.userId)
    const dedupedUserIds = [...new Set(userIds)]
    setPosts(posts)
    const promises = dedupedUserIds.map(id => fetchUser(id))
    const userList = await Promise.all(promises).then(users => users)
    userList.forEach(user => users[user.id] = user)
    setLoading(false)
  }

  async function fetchUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!response.ok) throw new Error(`fetchUser error: ${response.status}`)
    const user = await response.json()
    return user
  }

  const renderedPosts = posts.map(
    (post, index) => (
      <li key={index}>
        <Post post={post} user={users[post.userId]} />
      </li>
    )
  )

  function errorHandler(error) {
    // TODO: make this do more interesting things
    console.log(error)
  }

  return (
    <div>
      <LoadingDefault loading={loading} />
      <ul className={PostsStyles.posts}>
        { renderedPosts }
      </ul>
    </div>
  )
}

export default Posts
