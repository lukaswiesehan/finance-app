export const BlankCanvas = ({children}) => {
  return (
    <main className="w-full min-h-screen px-4 py-16 sm:px-0 sm:py-32 bg-white flex justify-center">
      <div className="w-96">
        {children}
      </div>
    </main>
  )
}