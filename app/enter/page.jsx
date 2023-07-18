'use client';

import { UserContext } from "@/lib/context";
import { auth, firestore, googleAuthProvider } from "@/lib/firebase";
import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { doc, getDoc, writeBatch } from "firebase/firestore";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} width="30px" /> Sign in with Google
      </button>
      <button onClick={() => signInAnonymously(auth)}>
        Sign in Anonymously
      </button>
    </>
  );
}

export const SignOutButton = () => <button onClick={() => signOut(auth)}>Sign Out</button>

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDocRef = doc(firestore, 'users', user.uid);
    const usernameDocRef = doc(firestore, 'usernames', formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(firestore);
    batch.set(userDocRef, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDocRef, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(firestore, 'usernames', username);
        const docSnap = await getDoc(ref);
        //console.log('Firestore read executed!');
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green">Choose</button>
        </form>

        <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
      </section>
    )
  )

}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

const EnterPage = () => {
  const { user, username } = useContext(UserContext);
  
  if (!user) {
    return <SignInButton />
  }
  if (!username) {
    return <UsernameForm />
  }
  return <SignOutButton />
}

export default EnterPage