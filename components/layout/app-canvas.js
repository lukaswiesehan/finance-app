import {NavMenu} from '@/components/layout/nav-menu'
import {SignOutButton} from '@/components/elements/signout-button'
import {FooterMenu} from '@/components/layout/footer-menu'

export const AppCanvas = ({children}) => {
  return (
    <div className="flex">
      <div className="relative w-24 flex-shrink-0 flex flex-col justify-between items-center">
        <div className="mt-24 pt-12 sticky top-0">
          <NavMenu/>
        </div>
        <div className="mb-24 pb-12 sticky bottom-0">
          <SignOutButton/>
        </div>
      </div>
      <div className="flex-grow">
        <header className="h-24 w-full"></header>
        <main className="w-full p-12 rounded-l-3xl bg-white">
          {children}
        </main>
        <FooterMenu/>
      </div>
    </div>
  )
} 