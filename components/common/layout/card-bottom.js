export const CardBottom = ({children, className, hidden}) => {
  return (
    <div className={`bg-gray-100 border-t border-gray-200 ${className}`} hidden={hidden}>
      {children}
    </div>
  )
}