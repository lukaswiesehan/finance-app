import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const Button = ({icon, label, onClick}) => {
  return (
    <button className="bg-gradient-to-br from-cyan-800 hover:from-cyan-900 to-blue-gray-800 hover:to-blue-gray-900 border border-blue-gray-800 hover:border-blue-gray-900 px-6 py-2 rounded-lg
      text-white transition-none
      focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
      type="button"
      tabIndex="0"
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 opacity-60"/>}
      <span>{label}</span>
    </button>
  )
}