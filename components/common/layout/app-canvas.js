import {NavMenu} from '@/components/common/layout/nav-menu'
import {MobileMenu} from '@/components/common/layout/mobile-menu'
import {ThemeButton} from '@/components/common/elements/theme-button'
import {SignOutButton} from '@/components/auth/signout-button'
import {FooterMenu} from '@/components/common/layout/footer-menu'

export const AppCanvas = ({children}) => {
  return (
    <div className="relative sm:flex bg-gray-100">
      <aside className="hidden sm:flex flex-col justify-between items-center relative w-24 md:w-32 flex-shrink-0">
        <div className="mt-24 pt-8 sticky top-0">
          <NavMenu/>
        </div>
        <div className="mb-24 pb-8 sticky bottom-0 flex space-x-2">
          <ThemeButton/>
          <SignOutButton/>
        </div>
      </aside>
      <div className="flex-grow">
        <header className="h-16 sm:h-24 w-full"></header>
        <main className="w-full p-4 py-8 sm:p-8 md:p-12 mb-16 sm:mb-0 sm:rounded-l-3xl bg-white border-t border-gray-200 space-y-16">
          {children}
        </main>
        <div className="hidden sm:block">
          <FooterMenu/>
        </div>
      </div>
      <div className="fixed w-full h-16 bottom-0 left-0 sm:hidden bg-gray-100 border-t border-gray-200">
        <NavMenu/>
      </div>
    </div>
  )
} 