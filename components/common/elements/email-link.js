import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/pro-solid-svg-icons'

export const EmailLink = ({email, name}) => {
  return (
    <Link href={name ? `mailto:${name} <${email}>` : `mailto:${email}`}>
      <a className="hover:text-gray-800 focus:outline-none focus:underline focus:text-gray-800">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-sm text-gray-600"/>
        {email}
      </a>
    </Link>
  )
}