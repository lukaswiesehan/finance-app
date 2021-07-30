import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faExclamation} from '@fortawesome/pro-solid-svg-icons'

export const ErrorMessage = ({heading, text, handleClose}) => {
  return (
    <div className="group flex space-x-3 justify-between items-start bg-gradient-to-br from-rose-200 to-red-300 text-red-800 border border-red-300 p-4 rounded-xl shadow-md">
      <div className="flex space-x-3">
        <div className="flex-shrink-0 w-5 h-5 flex justify-center items-center bg-red-600 bg-opacity-30 rounded-full">
          <FontAwesomeIcon icon={faExclamation} className="block text-xs"/>
        </div>
        <div className="text-sm space-y-2">
          {heading && 
            <p className="font-bold">{heading}</p>
          }
          <p>{text}</p>
        </div>
      </div>
      {handleClose && 
        <button onClick={handleClose} className="flex-shrink-0 w-5 h-5 rounded flex justify-center items-center hover:bg-red-600 hover:bg-opacity-30 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="block text-sm"/>
        </button>
      }
    </div>
  )
}