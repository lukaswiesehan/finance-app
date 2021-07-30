import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon} from '@fortawesome/pro-duotone-svg-icons'

export const ThemeButton = () => {
  const toggleTheme = () => {

  }

  return (
    <button onClick={toggleTheme} className="transition-none hover:transition-none text-xl text-gray-400 hover:text-gray-500">
      <FontAwesomeIcon icon={faMoon} className="block"/>
    </button>
  )
}