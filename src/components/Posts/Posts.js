import React, { useEffect, useState } from 'react'
import LoadingDefault from '../Loading/LoadingDefault'
import Post from './Post'
import PostsStyles from './Posts.module.scss'

const Posts = props => {

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})
  const [usersByEmail, setUsersByEmail] = useState({})

  const totalPages = Math.floor(posts.length / 10) - 1
  const postsByPage = posts.slice(currentPage * totalPages, currentPage * totalPages + 10)


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
    const userListById = {}
    const userListByEmail = {}
    userList.forEach(user => {
      userListById[user.id] = user
      userListByEmail[user.email] = user
    })
    setUsers(userListById)
    setUsersByEmail(userListByEmail)
    setLoading(false)
  }

  async function fetchUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!response.ok) throw new Error(`fetchUser error: ${response.status}`)
    const user = await response.json()
    return user
  }

  const getUserById = id => users[id]
  const getUserByEmail = email => usersByEmail[email]

  const renderedPosts = postsByPage.map(
    post => (
      <li key={post.id}>
        <Post post={post} user={users[post.userId]} getUserByEmail={getUserByEmail} />
      </li>
    )
  )

  function onClickNextPage() {
    setCurrentPage(currentPage + 1 <= totalPages ? currentPage + 1 : 1)
  }

  function onClickPreviousPage() {
    setCurrentPage(currentPage - 1 === 0 ? totalPages : currentPage - 1)
  }

  function errorHandler(error) {
    // TODO: make this do more interesting things
    console.log(error)
  }

  return (
    <div>
      <LoadingDefault loading={loading} />
      <div className={PostsStyles.paginationActions}>
        <button onClick={ onClickPreviousPage }>Previous</button>
        <p>Current page: { currentPage }</p>
        <button onClick={ onClickNextPage }>Next</button>
      </div>
      <ul className={PostsStyles.posts}>
        { renderedPosts }
      </ul>
    </div>
  )
}

export default Posts
