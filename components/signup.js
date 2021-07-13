import {useState, useRef} from 'react'
import {useSupabase} from '@/lib/supabase'
import {Input} from '@/components/forms/input'
import {Submit} from '@/components/forms/submit'

export const SignUp = () => {
  const supabase = useSupabase()

  const [formState, setFormState] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('loading')
    let {user, error} = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    console.log(user)
    console.log(error)
    setFormState('success')
  }

  return (
    <form onSubmit={handleSubmit} className="w-96 p-12 bg-white rounded-3xl space-y-12">
      <h1 className="text-2xl text-cool-gray-800 font-bold">Registrieren</h1>
      <div className="space-y-4"> 
        <Input type="text" id="name" label="Dein Name" placeholder="John Doe" required={true} error={nameError} ref={nameRef}/>
        <Input type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" required={true} error={emailError} ref={emailRef}/>
        <Input type="password" id="password" label="Dein Passwort" placeholder="Passwort" required={true} error={passwordError} ref={passwordRef}/>
      </div>
      <Submit label="Registrieren" loading={formState == 'loading'}/>
    </form>
  )
}