'use static';

import Link from "next/link";
import './globals.css';

const NotFound = () => {
  return (
    <>
      <h1>404 - That page does not seem to exist...</h1>
      <img src="/notfound.gif" alt="not found" />
      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </>
  );
}

export default NotFound