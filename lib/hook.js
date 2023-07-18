'use client';

import { auth, firestore } from '@/lib/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubcribe;

    if (user) {
      const ref = doc(collection(firestore, 'users'), user.uid);
      unsubcribe = onSnapshot(ref, doc => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubcribe;
  }, [user]);

  return { user, username };
}
