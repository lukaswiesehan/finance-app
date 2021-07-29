export const CardBottom = ({children, spacing, hidden}) => {
  return (
    <div className={`bg-gray-100 border-t border-gray-200 px-${spacing} py-${spacing / 2}`} hidden={hidden}>
      {children}
    </div>
  )
}