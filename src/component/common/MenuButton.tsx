"use client";

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react';

type props = {
  href : string,
  children : React.ReactNode
}

export default function MenuButton( {children, href} : props) {

  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        pathname === href ? 'text-[#DBA39A] font-semibold' : 'text-black hover:text-[#DBA39A] hover:font-semibold'
      )}

      href={href}
    >
      {children}
    </Link>
  )
} 