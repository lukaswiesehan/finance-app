import {forwardRef} from 'react'

export const Input = forwardRef(({className, type, id, label, placeholder, required, onBlur, error, disabled, skeleton}, ref) => {
  if(skeleton) {
    return (
      <div className={`${className} space-y-1 animate-pulse`}>
        <span className="text-sm text-gray-200 bg-gray-200 border border-gray-300 rounded-md">{label}</span>
        <div className="w-full text-gray-200 bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg">{placeholder}</div>
      </div>
    )
  } else {
    return (
      <div className={`${className} space-y-1`}>
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
        <input className={`w-full bg-white px-4 py-2 rounded-lg border border-gray-200
          text-gray-600 placeholder-gray-400
          ${disabled && 'bg-gray-50'}
          ${error && 'ring-2 ring-red-400 ring-offset-2 ring-offset-gray-50'}
          focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2`}
          type={type}
          id={id}
          name={id}
          aria-label={label}
          placeholder={placeholder}
          onBlur={onBlur}
          ref={ref}
          autoComplete="off"
          autoComplete="chrome-off"
          tabIndex="0"
          required={required}
          disabled={disabled}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
})