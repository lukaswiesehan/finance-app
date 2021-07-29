export const PasswordStrength = ({strength}) => {
  return (
    <div>
      <div className="w-full h-2.5 px-0.5 flex items-center bg-gray-100 rounded-xl border border-gray-200 mb-1">
        {strength == 'Stark' && <div className="rounded-xl h-1 w-full bg-green-500"/>}
        {strength == 'Okay' && <div className="rounded-xl h-1 w-1/2 bg-orange-500"/>}
        {strength == 'Schwach' && <div className="rounded-xl h-1 w-1/4 bg-red-500"/>}
      </div>
      <p className={`text-sm ${strength == 'Stark' ? 'text-green-500' : strength == 'Okay' ? 'text-orange-500' : 'text-red-500'}`}>{strength}</p>
    </div>
  )
}