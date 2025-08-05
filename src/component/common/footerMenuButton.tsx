import Link from "next/link";
import React from 'react';

type props = {
  href : string,
  children : React.ReactNode
}

export default function FooterMenu( { href, children } : props ) {

  return (
    <Link
      href={href}
      className="text-sm text-gray-400 text-light"
    >
      {children}
    </Link>
  )
}