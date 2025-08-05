"use client";

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function MenuButton( {children, href} ) {

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