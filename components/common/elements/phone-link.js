import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/pro-solid-svg-icons'

export const PhoneLink = ({phone}) => {
  return (
    <Link href={`tel:${phone}`}>
      <a className="hover:text-gray-800 focus:outline-none focus:underline focus:text-gray-800">
        <FontAwesomeIcon icon={faPhone} className="mr-2 text-sm text-gray-600"/>
        {phone}
      </a>
    </Link>
  )
}