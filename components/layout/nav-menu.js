import {useRouter} from 'next/router'
import {faRocketLaunch as faRocketLaunchDuotone, faUserFriends as faUserFriendsDuotone, faCogs as faCogsDuotone} from '@fortawesome/pro-duotone-svg-icons'
import {faRocketLaunch as faRocketLaunchLight, faUserFriends as faUserFriendsLight, faCogs as faCogsLight} from '@fortawesome/pro-light-svg-icons'

import {NavLink} from '@/components/elements/nav-link'

export const NavMenu = () => {
  const router = useRouter()
  const navElements = [
    {name: 'Dashboard', iconDuotone: faRocketLaunchDuotone, iconLight: faRocketLaunchLight, href: '/dashboard'},
    {name: 'Kunden', iconDuotone: faUserFriendsDuotone, iconLight: faUserFriendsLight, href: '/customers'},
    {name: 'Einstellungen', iconDuotone: faCogsDuotone, iconLight: faCogsLight, href: '/settings'}
  ]

  return (
    <nav className="w-24 flex-shrink-0">
      <ul className="w-full flex flex-col space-y-10">
        {navElements.map(({name, iconDuotone, iconLight, href}, index) => (
          <li key={index} className="w-full"><NavLink name={name} href={href} iconDuotone={iconDuotone} iconLight={iconLight} active={router.pathname == href}/></li>
        ))}
      </ul>
    </nav>
  )
}