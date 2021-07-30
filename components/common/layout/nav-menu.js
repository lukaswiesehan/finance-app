import {useRouter} from 'next/router'
import {faRocketLaunch, faUserFriends, faCogs} from '@fortawesome/pro-duotone-svg-icons'

import {NavLink} from '@/components/common/elements/nav-link'

export const NavMenu = () => {
  const router = useRouter()
  const navElements = [
    {name: 'Dashboard', icon: faRocketLaunch, bgClassName: 'bg-gradient-to-br from-green-400 to-cyan-500 border border-cyan-500', href: '/dashboard'},
    {name: 'Kunden', icon: faUserFriends, bgClassName: 'bg-gradient-to-br from-purple-500 to-indigo-500 border border-indigo-500', href: '/customers'},
    {name: 'Einstellungen', icon: faCogs, bgClassName: 'bg-gradient-to-br from-blue-gray-400 to-gray-500 border border-gray-500', href: '/settings/general'}
  ]

  return (
    <nav className="w-32 flex-shrink-0">
      <ul className="w-full flex flex-col items-center space-y-4">
        {navElements.map(({name, icon, bgClassName, href}, index) => (
          <li key={index}><NavLink name={name} href={href} icon={icon} bgClassName={bgClassName} active={router.pathname == href}/></li>
        ))}
      </ul>
    </nav>
  )
}