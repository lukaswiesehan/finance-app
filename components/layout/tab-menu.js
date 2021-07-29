import Link from 'next/link'
import {useRouter} from 'next/router'
 
export const TabMenu = ({elements}) => {
  const router = useRouter()

  return (
    <nav className="w-full border-b border-gray-200">
      <ul className="flex space-x-8 -mb-px">
        {elements.map(({name, href}, index) => (
          <li key={index}>
            <Link href={href}><a className={`block px-2 pb-4 border-b-2 ${router.pathname == href ? 'border-gray-800 text-gray-800 font-bold' : 'border-transparent hover:border-gray-300 hover:text-gray-800'}`}>{name}</a></Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}