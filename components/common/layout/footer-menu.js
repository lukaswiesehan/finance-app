import {FooterLink} from '@/components/common/elements/footer-link'

export const FooterMenu = () => {
  const currentYear = new Date().getFullYear()
  const footerItems = [
    {name: 'Impressum', href: '/legal'},
    {name: 'Datenschutz', href: '/privacy'},
    {name: 'Support', href: '/support'}
  ]

  return (
    <footer className="h-24 w-full px-12 flex justify-between items-center">
      <p className="text-sm text-gray-500">&copy; Lukas Wiesehan {currentYear}</p>
      <ul className="flex space-x-4">
        {footerItems.map(({name, href}, index) => (
          <li key={index}>
            <FooterLink name={name} href={href}/>
          </li>
        ))}
      </ul>
    </footer>
  )
}