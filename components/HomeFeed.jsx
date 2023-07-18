'use client';

import { useState } from 'react'
import PostFeed from './PostFeed';
import Loader from './Loader';
import { firestore, postToJSON } from '@/lib/firebase';
import { Timestamp, collectionGroup, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';

const HomeFeed = ({ posts: initPosts, LIMIT }) => {
  const [posts, setPosts] = useState(initPosts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor = typeof last.createdAt === "number" ? Timestamp.fromMillis(last.createdAt) : last.createdAt;
    const postQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT),
    );
    const newPosts = (await getDocs(postQuery)).docs.map(postToJSON);
    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}
      <Loader show={loading} />
      {postsEnd && 'You have reached the end!'}
    </>
  )
}

export default HomeFeed