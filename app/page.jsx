import HomeFeed from "@/components/HomeFeed";
import { firestore, postToJSON } from "@/lib/firebase";
import { collectionGroup, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const revalidate = 30;

const LIMIT = 10;

const HomePage = async() => {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'), 
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  );
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  return (
    <>
      <HomeFeed posts={posts} LIMIT={LIMIT} />
    </>
  )
}

export default HomePage