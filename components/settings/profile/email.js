import {useState, useEffect, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'

export const EmailSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const repeatEmailRef = useRef()
  const [formLoading, setFormLoading] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [repeatEmailError, setRepeatEmailError] = useState(null)

  useEffect(() => {
    getEmail()
  }, [session])

  const getEmail = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      emailRef.current.value = user.email
      repeatEmailRef.current.value = user.email
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(emailRef.current.value == '') {
      setEmailError('Bitte gib eine Email-Adresse ein.')
      return false
    } else if(!re.test(emailRef.current.value.toLowerCase())) {
      setEmailError('Bitte gib eine korrekte Email-Adresse an.')
      return false
    } else {
      setEmailError(null)
      return true
    }
  }

  const validateRepeatEmail = () => {
    if(emailRef.current.value != repeatEmailRef.current.value) {
      setRepeatEmailError('Die Email-Adresse stimmt nicht überein.')
      return false
    } else {
      setRepeatEmailError(null)
      return true
    }
  }

  const updateEmail = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      const emailSuccess = validateEmail()
      const repeatEmailSuccess = validateRepeatEmail()
      if(emailSuccess && repeatEmailSuccess) {
        const {error} = await supabase.auth.update({
          email: repeatEmailRef.current.value
        })
        if(error) throw error
        showNotification({type: 'info', heading: 'Neue Email-Adresse bestätigen', text: 'Schließe die Änderung über den Link ab, den wir an Deine neue Email-Adresse gesendet haben.'})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <FormCard className="grid-cols-1 lg:grid-cols-6"
      heading="Email-Adresse" 
      description="Lorem ipsum dolor sit amet."
      submitLabel="Email-Adresse speichern"
      onSubmit={updateEmail}
      loading={formLoading}
      collapsable
    >
      <Input className="lg:col-span-3" type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" onBlur={validateEmail} error={emailError} ref={emailRef} skeleton={loading}/>
      <Input className="lg:col-span-3" type="email" id="repeat-email" label="Email-Adresse bestätigen" placeholder="john.doe@email.com" onBlur={validateRepeatEmail} error={repeatEmailError} ref={repeatEmailRef} skeleton={loading}/>
    </FormCard>
  )
}