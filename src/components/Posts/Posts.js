import React, { useEffect, useState } from 'react'
import LoadingIcon from '../Loading/LoadingIcon'
import Post from '../Post/Post'
import PostsStyles from './Posts.module.scss'

const Posts = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})

  const totalPages = Math.floor(posts.length / 10) - 1
  const postsByPage = posts.slice(currentPage * totalPages, currentPage * totalPages + 10)

  const fetchUser = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!response.ok) throw new Error(`fetchUser error: ${response.status}`)
    const user = await response.json()
    return user
  }

  const onClickNextPage = () => {
    setCurrentPage(currentPage + 1 <= totalPages ? currentPage + 1 : 1)
  }

  const onClickPreviousPage = () => {
    setCurrentPage(currentPage - 1 === 0 ? totalPages : currentPage - 1)
  }

  const errorHandler = (error) => {
    // TODO: make this do more interesting things
    console.log(error)
  }

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!postsResponse.ok) throw new Error(`fetchPosts error: ${postsResponse.status}`)
      const posts = await postsResponse.json()
      const userIds = posts.map(post => post.userId)
      const dedupedUserIds = [...new Set(userIds)]
      const promises = dedupedUserIds.map(id => fetchUser(id))
      // NOTE: fetch all unique users from post list to avoid duplicate requests
      const userList = await Promise.all(promises).then(users => users)
      const userListById = {}
      userList.forEach(user => userListById[user.id] = user)
      setPosts(posts)
      setUsers(userListById)
      setLoading(false)
    }

    fetchPosts().catch(error => errorHandler(error))
  }, []);

  return (
    <div>
      <LoadingIcon loading={loading} />
      <div className={PostsStyles.paginationActions}>
        <button onClick={ onClickPreviousPage }>
          <span className="material-icons">navigate_before</span>
          <span className="sr-only">View previous page</span>
        </button>
        <p>Current page: { currentPage }</p>
        <button onClick={ onClickNextPage }>
          <span className="material-icons">navigate_next</span>
          <span className="sr-only">View next page</span>
        </button>
      </div>
      <ul className={PostsStyles.posts}>
        {
          postsByPage.map(
            post => (
              <li key={`post-${post.id}`}>
                <Post post={post} user={users[post.userId]} />
              </li>
            )
          )
        }
      </ul>
    </div>
  )
}

export default Posts
