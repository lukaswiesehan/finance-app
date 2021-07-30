import {useState, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {CardBottom} from '@/components/common/layout/card-bottom'
import {Heading} from '@/components/common/elements/heading'
import {Input} from '@/components/common/forms/input'
import {Submit} from '@/components/common/forms/submit'
import {ErrorMessage} from '@/components/common/elements/error-message'
import {SuccessMessage} from '@/components/common/elements/success-message'
import {ChevronLink} from '@/components/common/elements/chevron-link'

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

  const clearForm = () => {
    emailRef.current.value = ''
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
        clearForm()
      }
    }
  }

  return (
    <Card>
      <CardMain className="p-12 space-y-12">
        <h1><Heading>Passwort zurücksetzen</Heading></h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" required={true} onBlur={validateEmail} error={emailError} ref={emailRef}/>
          <Submit label="Passwort zurücksetzen" loading={formState.state == 'loading'} className="w-full"/>
          {formState.state == 'error' && <div className="mb-4"><ErrorMessage text={formState.message}/></div>}
          {formState.state == 'success' && <div className="mb-4"><SuccessMessage text={formState.message}/></div>}
        </form>
      </CardMain>
      <CardBottom className="px-12 py-6">
        <p><ChevronLink href="/login" external={false}>Anmelden</ChevronLink></p>
      </CardBottom>
    </Card>


  )
}