'use client';

import AuthCheck from "@/components/AuthCheck"
import { auth, firestore } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import ImageUploader from "@/components/ImageUploader";
import { revalidatePost } from "@/lib/revalidate";

const AdminPostEdit = ({params}) => {
  return (
    <AuthCheck>
      <h1>Edit Post</h1>
      <PostManager slug={params.slug} />
    </AuthCheck>
  )
}

const PostManager = ({ slug }) => {
  const [preview, setPreview] = useState(false);
  const postRef = doc(firestore,'users',auth.currentUser.uid,'posts',slug);
  // take data from postref
  const [post] = useDocumentDataOnce(postRef);
  return (
    post && (
    <div className="container">
      <section>
        <h1>{post.title}</h1>
        <p>ID: {post.slug}</p>
        <PostForm postRef={postRef} defaultValues={post} preview={preview} />
      </section>
      <aside>
        <h3>Tools</h3>
        <button onClick={() => setPreview(!preview)} className="w-full">
          {preview ? 'Edit' : 'Preview'}
        </button>
        <Link href={`/${post.username}/${post.slug}`} prefetch={false}>
          <button className="btn-blue w-full">Live view</button>
        </Link>
      </aside>
    </div>)
  )
}

const PostForm = ({ postRef, defaultValues, preview }) => {
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: 'onChange' });
  const { isValid, isDirty, errors } = formState;

  const updatePost = async({ content, published }) => {
    const { username, slug } = defaultValues;
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });
    reset({ content, published });
    await revalidatePost(username, slug);

    //console.log(nice.text())
    toast.success("Post is updated succesfully");
  }
  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : "controls"}>
        <ImageUploader />
        <textarea name="content" {...register("content", {
          maxLength: { value: 20000, message: 'content is too long' },
          minLength: { value: 10, message: 'content is too short' },
          required: { value: true, message: 'content is required' }
        })} />
        {errors.content && <p className="text-danger">{errors.content.message}</p>}
        <fieldset>
          <input className="checkbox" type="checkbox" {...register("published")} />
          <label>Published</label>
        </fieldset>
        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default AdminPostEdit