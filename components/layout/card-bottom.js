export const CardBottom = ({children, className}) => {
  return (
    <div className={`bg-gray-100 p-12 ${className}`}>
      {children}
    </div>
  )
}