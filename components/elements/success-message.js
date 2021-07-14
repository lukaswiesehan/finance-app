import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/pro-duotone-svg-icons'

export const SuccessMessage = ({children}) => {
  return (
    <div className="flex space-x-2 text-green-600 bg-green-100 p-2 rounded-lg">
      <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5"/>
      <div className="text-sm">{children}</div>
    </div>
  )
}