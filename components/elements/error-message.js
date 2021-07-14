import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle} from '@fortawesome/pro-duotone-svg-icons'

export const ErrorMessage = ({children}) => {
  return (
    <div className="relative text-red-600 bg-red-100 py-2 pl-5 pr-4 rounded-lg">
      <FontAwesomeIcon icon={faExclamationCircle} className="absolute -left-2.5 bg-white rounded-full p-0.5 text-xl"/>
      <div className="text-sm">{children}</div>
    </div>
  )
}