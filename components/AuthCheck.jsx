'use client';

import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useContext } from "react";

const AuthCheck = ({ fallback, children }) => {
  const {username} = useContext(UserContext);
  return (
    username ? 
    children : 
    fallback ?? <Link href='/enter'><button className="btn-blue">You must be signed in</button></Link>
  )
}

export default AuthCheck