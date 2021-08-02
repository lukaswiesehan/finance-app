import {Switch as Toggle} from '@headlessui/react'

export const Switch = ({checked, onChange, label, className}) => {
  return (
    <Toggle.Group className={className}>
      <div>
        <Toggle.Label className="text-sm text-gray-600">{label}</Toggle.Label>
        <div className="mt-1 h-10 flex items-center">
          <Toggle type="button" checked={checked} onChange={onChange}
            className={`bg-gradient-to-br border ${checked ? 'from-green-400 to-teal-500 border-teal-500' : 'from-blue-gray-300 to-gray-400 border-gray-400'}
            relative inline-flex items-center h-7 rounded-full w-12 transition-colors 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}
          >
            <span
              className={`${checked ? 'translate-x-6 border-teal-500' : 'translate-x-1 border-gray-400'} 
              inline-block w-5 h-5 transform bg-white rounded-full border transition-transform`}
            />
          </Toggle>
        </div>
        
      </div>
    </Toggle.Group>
  )
}