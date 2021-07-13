import {forwardRef} from 'react'

export const Input = forwardRef(({type, id, label, placeholder, required, validation, error}, ref) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className={`text-sm ${error ? 'text-red-400' : 'text-gray-600'}`}>
        {label}
      </label>
      <input className={`w-full bg-gray-100 px-4 py-2 rounded-lg
        text-gray-600 placeholder-gray-400
        ${error && 'ring-2 ring-red-400'}
        focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white`}
        type={type}
        id={id}
        name={id}
        aria-label={label}
        placeholder={placeholder}
        onBlur={validation}
        ref={ref}
        autoComplete="off"
        autoComplete="chrome-off"
        tabIndex="0"
        required={required}
      />
    </div>
  )
})