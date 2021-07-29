import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon} from '@fortawesome/pro-duotone-svg-icons'

export const ThemeButton = () => {
  const toggleTheme = () => {

  }

  return (
    <button onClick={toggleTheme} className="w-6 h-6 flex justify-center items-center rounded-md text-white  bg-gradient-to-br from-indigo-800 to-blue-gray-800 border border-blue-gray-800 ring-2 ring-offset-2 ring-offset-gray-100 ring-transparent hover:ring-gray-300">
      <FontAwesomeIcon icon={faMoon} className="text-sm"/>
    </button>
  )
}