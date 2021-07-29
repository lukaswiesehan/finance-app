export const Card = ({className, children}) => {
  return (
    <div className={`w-full bg-gray-50 overflow-hidden rounded-2xl border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}