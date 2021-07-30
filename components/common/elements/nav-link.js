import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const NavLink = ({name, icon, bgClassName, href, active}) => {
  return (
    <Link href={href}>
      <a className="flex flex-col items-center">
        <div 
          className={`w-14 h-14 flex justify-center items-center rounded-xl text-white text-3xl
          ring-2 ring-offset-2 ring-offset-gray-100 ring-transparent 
          ${active ? 'ring-gray-800' : 'hover:ring-gray-300'}
          ${bgClassName}`}
        >
          <FontAwesomeIcon icon={icon}/>
        </div>
        <span className={`block mt-2 text-xs ${active ? 'text-gray-800' : 'text-gray-500'}`}>{name}</span>
      </a>
    </Link>
  )
}