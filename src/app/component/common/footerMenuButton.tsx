import Link from "next/link";

type FooterMenuProps = {
  href : string;
  children : string;
}

export default function FooterMenu( { href, children } : FooterMenuProps ) {

  return (
    <Link
      href={href}
      className="text-sm text-gray-400 text-light"
    >
      {children}
    </Link>
  )
}