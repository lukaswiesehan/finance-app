import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle} from '@fortawesome/pro-duotone-svg-icons'

export const ErrorMessage = ({children}) => {
  return (
    <div className="flex space-x-2 text-red-600 bg-red-100 p-2 rounded-lg">
      <FontAwesomeIcon icon={faExclamationCircle} className="mt-0.5"/>
      <div className="text-sm">{children}</div>
    </div>
  )
}