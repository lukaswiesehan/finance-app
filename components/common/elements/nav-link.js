import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const NavLink = ({name, icon, bgClassName, href, active}) => {
  return (
    <Link href={href}>
      <a className="group flex flex-col items-center focus:outline-none">
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex justify-center items-center rounded-xl text-white text-xl sm:text-2xl md:text-3xl
          ring-2 ring-offset-2 ring-offset-gray-100 ring-transparent 
          ${active ? 'ring-gray-800' : 'hover:ring-gray-300 group-focus:ring-gray-300'}
          ${bgClassName}`}
        >
          <FontAwesomeIcon icon={icon}/>
        </div>
        <span className={`hidden sm:block mt-2 text-xs ${active ? 'text-gray-800' : 'text-gray-500'}`}>{name}</span>
      </a>
    </Link>
  )
}