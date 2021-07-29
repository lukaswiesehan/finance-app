import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faCheck} from '@fortawesome/pro-solid-svg-icons'

export const InfoMessage = ({heading, text, handleClose}) => {
  return (
    <div className="group flex space-x-3 justify-between items-start bg-gradient-to-br from-sky-200 to-blue-300 text-sky-800 border border-blue-300 p-4 rounded-xl shadow-lg">
      <div className="flex space-x-3">
        <div className="flex-shrink-0 w-5 h-5 flex justify-center items-center bg-sky-600 bg-opacity-30 rounded-full">
          <FontAwesomeIcon icon={faCheck} className="block text-xs"/>
        </div>
        <div className="text-sm space-y-2">
          {heading && 
            <p className="font-bold">{heading}</p>
          }
          <p>{text}</p>
        </div>
      </div>
      {handleClose && 
        <button onClick={handleClose} className="flex-shrink-0 w-5 h-5 rounded flex justify-center items-center hover:bg-sky-600 hover:bg-opacity-30 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="block text-sm"/>
        </button>
      }
    </div>
  )
}