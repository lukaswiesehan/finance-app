import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronCircleRight} from '@fortawesome/pro-duotone-svg-icons'

export const ChevronLink = ({href, external, children}) => {
  return (
      <Link href={href}>
        <a target={external ? '_blank' : ''} rel={external ? 'noreferrer' : ''} className="group text-gray-600 hover:text-gray-800 inline-flex items-center">
          {children}
          <FontAwesomeIcon icon={faChevronCircleRight} className="ml-2"/>
        </a>
      </Link>
  )
}