export const CardMain = ({children, spacing}) => {
  return (
    <div className={`p-${spacing} space-y-${spacing}`}>
      {children}
    </div>
  )
}