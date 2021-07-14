import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/pro-duotone-svg-icons'

export const SuccessMessage = ({children}) => {
  return (
    <div className="relative text-green-600 bg-green-100 py-2 px-4 rounded-lg">
      <FontAwesomeIcon icon={faCheckCircle} className="absolute -left-2.5 bg-white rounded-full p-0.5 text-xl"/>
      <div className="text-sm">{children}</div>
    </div>
  )
}