import {useState, useRef} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Card} from '@/components/layout/card'
import {CardMain} from '@/components/layout/card-main'
import {CardBottom} from '@/components/layout/card-bottom'
import {Heading} from '@/components/elements/heading'
import {Input} from '@/components/forms/input'
import {Submit} from '@/components/forms/submit'
import {ErrorMessage} from '@/components/elements/error-message'
import {ChevronLink} from '@/components/elements/chevron-link'

export const Login = () => {
  const supabase = useSupabase()
  const router = useRouter()

  const [formState, setFormState] = useState({state: 'idle', message: ''})
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()

  const validateEmail = () => {
    if(emailRef.current.value == '') {
      setEmailError('Bitte gib Deine Email-Adresse ein.')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const validatePassword = () => {
    if(passwordRef.current.value == '') {
      setPasswordError('Bitte gib Dein Passwort ein.')
      return false
    } else {
      setPasswordError('')
      return true
    }
  } 

  const validateAll = () => {
    const emailSuccess = validateEmail()
    const passwordSuccess = validatePassword()
    return emailSuccess && passwordSuccess
  }

  const clearForm = () => {
    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(validateAll()) {
      setFormState({state: 'loading', message: ''})
      const {error} = await supabase.auth.signIn({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      if(error) {
        setFormState({state: 'error', message: 'Deine Email-Adresse oder das Passwort ist nicht korrekt.'})
      } else {
        setFormState({state: 'success', message: ''})
        clearForm()
        router.push('/dashboard')
      }
    }
  }

  return (
    <Card>
      <CardMain>
        <h1><Heading>Anmelden</Heading></h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Input type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" required={true} onBlur={validateEmail} error={emailError} ref={emailRef}/>
            <Input type="password" id="password" label="Dein Passwort" placeholder="Passwort" required={true} onBlur={validatePassword} error={passwordError} ref={passwordRef}/>
          </div>
          <Submit label="Anmelden" loading={formState.state == 'loading'}/>
          {formState.state == 'error' && <div className="mb-4"><ErrorMessage>{formState.message}</ErrorMessage></div>}
        </form>
      </CardMain>
      <CardBottom>
        <p><ChevronLink href="/reset-password" external={false}>Passwort zurücksetzen</ChevronLink></p>
        <p><ChevronLink href="/signup" external={false}>Registrieren</ChevronLink></p>
      </CardBottom>
    </Card>
  )
}