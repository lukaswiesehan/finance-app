import {NavMenu} from '@/components/layout/nav-menu'
import {ThemeButton} from '@/components/elements/theme-button'
import {SignOutButton} from '@/components/elements/signout-button'
import {FooterMenu} from '@/components/layout/footer-menu'

export const AppCanvas = ({children}) => {
  return (
    <div className="flex bg-gray-100">
      <div className="relative w-32 flex-shrink-0 flex flex-col justify-between items-center">
        <div className="mt-24 pt-8 sticky top-0">
          <NavMenu/>
        </div>
        <div className="mb-24 pb-8 sticky bottom-0 flex space-x-2">
          <ThemeButton/>
          <SignOutButton/>
        </div>
      </div>
      <div className="flex-grow">
        <header className="h-24 w-full"></header>
        <main className="w-full p-12 rounded-l-3xl bg-white border border-gray-200 space-y-16">
          {children}
        </main>
        <FooterMenu/>
      </div>
    </div>
  )
} 