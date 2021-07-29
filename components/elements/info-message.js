import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faInfo} from '@fortawesome/pro-solid-svg-icons'

export const InfoMessage = ({heading, text, handleClose}) => {
  return (
    <div className="group flex space-x-3 justify-between items-start bg-gradient-to-br from-blue-gray-200 to-true-gray-300 text-blue-gray-700 border border-true-gray-300 p-4 rounded-xl shadow-md">
      <div className="flex space-x-3">
        <div className="flex-shrink-0 w-5 h-5 flex justify-center items-center bg-true-gray-500 bg-opacity-30 rounded-full">
          <FontAwesomeIcon icon={faInfo} className="block text-xs"/>
        </div>
        <div className="text-sm space-y-2">
          {heading && 
            <p className="font-bold">{heading}</p>
          }
          <p>{text}</p>
        </div>
      </div>
      {handleClose && 
        <button onClick={handleClose} className="flex-shrink-0 w-5 h-5 rounded flex justify-center items-center hover:bg-true-gray-500 hover:bg-opacity-30 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="block text-sm"/>
        </button>
      }
    </div>
  )
}