import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHomeAlt, faChevronRight} from '@fortawesome/pro-solid-svg-icons'

export const Breadcrumbs = ({elements}) => {
  return (
    <div className="flex items-center text-sm text-gray-400">
      <Link href="/dashboard"><a className="hover:text-gray-600">Dashboard</a></Link>
      {elements.map(({title, href}, index) => (
        <div key={index} className={`flex items-center ${index == (elements.length - 1) && 'text-gray-600'}`}>
          <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-400 text-xs"/>
          {href ? <Link href={href}><a className={index == (elements.length -1) ? 'hover:text-gray-800' : 'hover:text-gray-600'}>{title}</a></Link> : <span>{title}</span>}
        </div>
      ))}
    </div>
  )
}