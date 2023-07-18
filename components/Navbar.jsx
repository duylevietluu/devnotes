'use client';

import Link from "next/link"
import { useContext } from "react";
import { UserContext } from "@/lib/context";


const Navbar = () => {
  const { user, username } = useContext(UserContext);
  
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href='/'>
            <button className="btn-logo">NOTE</button>
          </Link>
        </li>
        <li>
          <Link href='/about' className="mx-auto font-bold text-xl text-blue-800 hover:text-blue-500">ABOUT</Link>
        </li>
        {
          username ?
          <>
            <li className="push-left">
              <Link href='/admin'>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL ?? '/hacker.png'} alt="profile" />
              </Link>
            </li>
          </> :
          <li>
            <Link href='/enter'>
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Navbar