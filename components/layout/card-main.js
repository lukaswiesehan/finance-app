export const CardMain = ({children, className}) => {
  return (
    <div className={`p-12 space-y-12 ${className}`}>
      {children}
    </div>
  )
}