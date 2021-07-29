import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faExclamation} from '@fortawesome/pro-solid-svg-icons'

export const ErrorMessage = ({heading, text, handleClose}) => {
  return (
    <div className="group flex space-x-3 justify-between items-start text-red-700 border border-red-200 bg-red-100 p-4 rounded-lg shadow">
      <div className="flex space-x-3">
      <div className="flex-shrink-0 w-5 h-5 flex justify-center items-center bg-red-500 bg-opacity-25 rounded-full">
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
        <button onClick={handleClose} className="flex-shrink-0 w-5 h-5 rounded flex justify-center items-center hover:bg-opacity-25 hover:bg-red-500 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="block text-sm"/>
        </button>
      }
    </div>
  )
}