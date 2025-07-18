import Link from "next/link";

export default function FooterMenu( { href, children } ) {

  return (
    <Link
      href={href}
      className="text-sm text-gray-400 text-light"
    >
      {children}
    </Link>
  )
}