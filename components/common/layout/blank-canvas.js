export const BlankCanvas = ({children}) => {
  return (
    <main className="w-full bg-white py-32 flex justify-center">
      <div className="w-96">
        {children}
      </div>
    </main>
  )
}