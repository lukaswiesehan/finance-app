import Link from 'next/link'
import {useRouter} from 'next/router'
 
export const TabMenu = ({elements}) => {
  const router = useRouter()

  return (
    <nav className="w-full overflow-x-scroll overflow-y-hidden pb-3">
      <ul className="whitespace-nowrap space-x-2 sm:space-x-4 md:space-x-8 border-b border-gray-200 -mb-px">
        {elements.map(({name, href}, index) => (
          <li className="inline-block" key={index}>
            <Link href={href}><a className={`block px-2 pb-4 border-b-2 ${router.pathname == href ? 'border-gray-800 text-gray-800 font-bold' : 'border-transparent hover:border-gray-300 hover:text-gray-800'}`}>{name}</a></Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}