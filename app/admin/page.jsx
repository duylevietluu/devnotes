'use client';

import AuthCheck from "@/components/AuthCheck"
import PostFeed from "@/components/PostFeed";
import { UserContext } from "@/lib/context";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { revalidatePost } from "@/lib/revalidate";

const AdminPostsPage = () => {
  return (
    <AuthCheck>
      <CreateNewPost />
      <PostList />
      
    </AuthCheck>
  )
}

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(firestore, 'users', uid, 'posts', slug);
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }
    await setDoc(ref, data);
    toast.success('Post created!');
    router.push(`admin/${slug}`);
    await revalidatePost(username, slug);
  }

  return (
    <>
      <h1>Write posts</h1>
      <form onSubmit={createPost}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="enter title..." className="input" />
        <p>
          <strong>Slug: </strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </form>
    </>
    
  )
}

const PostList = () => {
  const ref = collection(firestore, 'users', auth.currentUser.uid, 'posts');
  const q = query(ref, orderBy('createdAt', 'desc'));
  const [querySnapshot] = useCollection(q);
  const posts = querySnapshot?.docs.map((doc) => doc.data());
  return (
    <>
      <PostFeed posts={posts} admin />
    </>
  )
}

export default AdminPostsPage