import PostFeed from "@/components/PostFeed"
import UserProfile from "@/components/UserProfile"
import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { notFound } from 'next/navigation';

export function generateMetadata({ params }) {
  // read route params
  const username = params.username;
 
  return {
    title: `${username} - Dev Notes`,
  }
}

const UserPage = async({params}) => {
  const {username} = params;
  const userDoc = await getUserWithUsername(username);
  let user = null, posts = null;
  if (userDoc) {
    user = userDoc.data();
    const postQuery = query(
      collection(userDoc.ref, 'posts'), 
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5),
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON);
  } else {
    notFound();
  }
  
  return (
    <>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </>
  )
}

export default UserPage