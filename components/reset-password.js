import {useState, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {Card} from '@/components/layout/card'
import {CardMain} from '@/components/layout/card-main'
import {CardBottom} from '@/components/layout/card-bottom'
import {Heading} from '@/components/elements/heading'
import {Input} from '@/components/forms/input'
import {Submit} from '@/components/forms/submit'
import {ErrorMessage} from '@/components/elements/error-message'
import {SuccessMessage} from '@/components/elements/success-message'
import {ChevronLink} from '@/components/elements/chevron-link'

export const ResetPassword = () => {
  const supabase = useSupabase()

  const [formState, setFormState] = useState({state: 'idle', message: ''})
  const [emailError, setEmailError] = useState('')
  const emailRef = useRef()

  const validateEmail = () => {
    if(emailRef.current.value == '') {
      setEmailError('Bitte gib Deine Email-Adresse ein.')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(validateEmail()) {
      setFormState({state: 'loading', message: ''})
      const {data, error} = await supabase.auth.api.resetPasswordForEmail(emailRef.current.value)
      if(error) {
        setFormState({state: 'error', message: 'Die eingegebene Email-Adresse scheint nicht korrekt zu sein.'})
      } else {
        setFormState({state: 'success', message: 'Wir haben Dir eine Email zum Zurücksetzen des Passworts geschickt.'})
      }
    }
  }

  return (
    <Card>
      <CardMain>
        <h1><Heading>Passwort zurücksetzen</Heading></h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" required={true} onBlur={validateEmail} error={emailError} ref={emailRef}/>
          <Submit label="Passwort zurücksetzen" loading={formState.state == 'loading'}/>
          {formState.state == 'error' && <div className="mb-4"><ErrorMessage>{formState.message}</ErrorMessage></div>}
        {formState.state == 'success' && <div className="mb-4"><SuccessMessage>{formState.message}</SuccessMessage></div>}
        </form>
      </CardMain>
      <CardBottom>
        <p><ChevronLink href="/login" external={false}>Anmelden</ChevronLink></p>
      </CardBottom>
    </Card>


  )
}