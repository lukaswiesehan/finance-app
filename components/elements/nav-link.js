import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretLeft} from '@fortawesome/pro-solid-svg-icons'

export const NavLink = ({name, iconDuotone, iconLight, href, active}) => {
  return (
    <Link href={href}>
      <a className={`group relative w-full flex justify-center items-center text-3xl
        ${active ? 'text-gray-800' : 'text-gray-500'}
        hover:text-gray-800`}
      >
        <FontAwesomeIcon icon={iconDuotone} className={active ? 'block' : 'hidden'}/>
        <FontAwesomeIcon icon={iconLight} className={active ? 'hidden' : 'block'}/>
        <div className="absolute w-0 overflow-hidden group-hover:w-auto group-hover:overflow-visible">
          <div className="
            flex items-center space-x-1 translate-x-1/3 ml-12 opacity-0 
            transition-all duration-150 group-hover:translate-x-1/2 group-hover:opacity-100
          ">
            <FontAwesomeIcon icon={faCaretLeft} className="text-lg drop-shadow-md"/>
            <span className="inline-block text-xs text-white bg-gray-800 py-0.5 px-2 rounded-lg drop-shadow-md">{name}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}