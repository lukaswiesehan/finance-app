export const Card = ({className, children}) => {
  return (
    <div className={`w-96 bg-white overflow-hidden rounded-3xl ${className}`}>
      {children}
    </div>
  )
}