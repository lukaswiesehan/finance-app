export const Title = ({children, skeleton}) => {
  if(skeleton) {
    return (
      <span className="animate-pulse inline-block h-10 w-96 rounded-xl bg-gray-200 border border-gray-300"/>
    )
  } else {
    return (
      <span className="text-4xl text-gray-800 font-bold">{children}</span>
    )
  }
} 