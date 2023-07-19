import PostContent from "@/components/PostContent";
import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import HeartCount from "./HeartCount";
import { notFound } from "next/navigation";
import AuthCheck from "@/components/AuthCheck";
import HeartButton from "@/components/HeartButton";

export const revalidate = 5000; // revalidate every 5000 seconds

export function generateMetadata({ params }) {
  const { username, slug } = params;
  const title = `${username} - ${slug}`.slice(0, 60);
  return {
    title,
  }
}

const PostPage = async({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post, path;
  const postRef = userDoc && doc(userDoc.ref, 'posts', slug);
  if (userDoc) {
    const postDoc = await getDoc(postRef);
    post = postDoc.data();
    if (!post) notFound();
    path = postRef.path;
  } else {
    notFound();
  }
  return (
    <div className="container">
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <HeartCount path={path} initCount={post.heartCount} />
        <AuthCheck>
          <HeartButton path={path} />
        </AuthCheck>
      </aside>
    </div>
  )
}

export default PostPage