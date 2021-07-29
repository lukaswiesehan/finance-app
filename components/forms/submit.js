import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinnerThird} from '@fortawesome/pro-solid-svg-icons'

export const Submit = ({label, loading, className}) => {
  return (
    <button className={`bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-lg
      text-white transition-none
      focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-100
      ${className}`}
      type="submit"
      tabIndex="0"
      disabled={loading}
    >
      {loading ? <FontAwesomeIcon icon={faSpinnerThird} className="animate-spin"/> : label}
    </button>
  )
}