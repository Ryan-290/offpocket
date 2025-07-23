"use client";

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export type MenuButtonProps = {
  href : string;
  children : string;
}

export default function MenuButton( {children, href}:MenuButtonProps ) {

  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        'flex items-center',
        pathname === href ? 'text-[#DBA39A] font-semibold' : 'text-black hover:text-[#DBA39A] hover:font-semibold'
      )}

      href={href}
    >
      {children}
    </Link>
  )
} 