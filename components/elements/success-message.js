import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faCheck} from '@fortawesome/pro-solid-svg-icons'

export const SuccessMessage = ({heading, text, handleClose}) => {
  return (
    <div className="group flex space-x-3 justify-between items-start bg-gradient-to-br from-green-200 to-emerald-300 text-emerald-800 border border-emerald-300 p-4 rounded-xl shadow-md">
      <div className="flex space-x-3">
        <div className="flex-shrink-0 w-5 h-5 flex justify-center items-center bg-emerald-600 bg-opacity-30 rounded-full">
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
        <button onClick={handleClose} className="flex-shrink-0 w-5 h-5 rounded flex justify-center items-center hover:bg-emerald-600 hover:bg-opacity-30 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="block text-sm"/>
        </button>
      }
    </div>
  )
}