import {useState, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {CardBottom} from '@/components/common/layout/card-bottom'
import {Heading} from '@/components/common/elements/heading'
import {Input} from '@/components/common/forms/input'
import {PasswordStrength} from '@/components/common/forms/password-strength'
import {Submit} from '@/components/common/forms/submit'
import {ErrorMessage} from '@/components/common/elements/error-message'
import {SuccessMessage} from '@/components/common/elements/success-message'
import {ChevronLink} from '@/components/common/elements/chevron-link'

export const SignUp = () => {
  const supabase = useSupabase()

  const [formState, setFormState] = useState({state: 'idle', message: ''})
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(emailRef.current.value == '') {
      setEmailError('Die Email-Adresse ist ein Pflichtfeld.')
      return false
    } else if(!re.test(emailRef.current.value.toLowerCase())) {
      setEmailError('Bitte geben Sie eine korrekte Email-Adresse an.')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const validatePassword = () => {
    const reStrong = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}))/
    const reMedium = /^( ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})))/
    if(passwordRef.current.value == '') {
      setPasswordError('Das Passwort ist ein Pflichtfeld.')
      return false
    }
    else if(reStrong.test(passwordRef.current.value)) {
      setPasswordStrength('Stark')
      setPasswordError('')
      return true
    } else if(reMedium.test(passwordRef.current.value)) {
      setPasswordStrength('Okay')
      setPasswordError('')
      return true
    } else {
      setPasswordStrength('Schwach')
      setPasswordError('Das Passwort ist zu schwach.')
      return false
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
      const {error} = await supabase.auth.signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      if(error) {
        setFormState({state: 'error', message: 'Bei der Registrierung ist etwas schief gelaufen. Bitte versuche es sp??ter nochmal.'})
      } else {
        setFormState({state: 'success', message: 'Schlie??e die Registrierung ??ber den Link ab, den wir an Deine Email-Adresse gesendet haben.'})
        clearForm()
      }
    }
  }

  return (
    <Card>
      <CardMain className="p-6 sm:p-12 space-y-6 sm:space-y-12">
        <h1><Heading>Registrieren</Heading></h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Input type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" required={true} onBlur={validateEmail} error={emailError} ref={emailRef}/>
            <Input type="password" id="password" label="Dein Passwort" placeholder="Passwort" required={true} onBlur={validatePassword} error={passwordError} ref={passwordRef}/>
            {passwordStrength && <PasswordStrength strength={passwordStrength}/>}
          </div>
          <Submit label="Registrieren" loading={formState.state == 'loading'} className="w-full"/>
          {formState.state == 'error' && <div className="mb-4"><ErrorMessage text={formState.message}/></div>}
          {formState.state == 'success' && <div className="mb-4"><SuccessMessage text={formState.message}/></div>}
        </form>
      </CardMain>
      <CardBottom className="p-6 sm:px-12">
        <p><ChevronLink href="/login" external={false}>Anmelden</ChevronLink></p>
      </CardBottom>
    </Card>
  )
}