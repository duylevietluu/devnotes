"use client";

import { firestore } from '@/lib/firebase';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const HeartCount = ({ path, initCount }) => {
  const postRef = doc(firestore, path);
  const [realtimePost] = useDocumentData(postRef);
  return (
    <p>
      <strong>{realtimePost?.heartCount || initCount || 0} ❤️ </strong>
    </p>
  )
}

export default HeartCount