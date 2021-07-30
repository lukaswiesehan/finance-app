import Link from 'next/link'

export const FooterLink = ({name, href}) => {
  return (
    <Link href={href}>
      <a className="text-sm text-gray-500 hover:text-gray-600">
        {name}
      </a>
    </Link>
  )
}