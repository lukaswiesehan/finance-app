import {useState, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'
import {PasswordStrength} from '@/components/common/forms/password-strength'

export const PasswordSettings = () => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const passwordRef = useRef()
  const repeatPasswordRef = useRef()
  const [formLoading, setFormLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [repeatPasswordError, setRepeatPasswordError] = useState(null)

  const validatePassword = () => {
    const reStrong = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}))/
    const reMedium = /^( ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})))/
    if(passwordRef.current.value == '') {
      setPasswordError('Bitte gib ein Passwort ein.')
      return false
    } else if(reStrong.test(passwordRef.current.value)) {
      setPasswordStrength('Stark')
      setPasswordError(null)
      return true
    } else if(reMedium.test(passwordRef.current.value)) {
      setPasswordStrength('Okay')
      setPasswordError(null)
      return true
    } else {
      setPasswordStrength('Schwach')
      setPasswordError('Das Passwort ist zu schwach.')
      return false
    }
  }

  const validateRepeatPassword = () => {
    if(passwordRef.current.value != repeatPasswordRef.current.value) {
      setRepeatPasswordError('Das Passwort stimmt nicht überein.')
      return false
    } else {
      setRepeatPasswordError(null)
      return true
    }
  }

  const updatePassword = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      const passwordSuccess = validatePassword()
      const repeatPasswordSuccess = validateRepeatPassword()
      if(passwordSuccess && repeatPasswordSuccess) {
        const {error} = await supabase.auth.update({
          password: repeatPasswordRef.current.value
        })
        if(error) throw error
        showNotification({type: 'success', text: 'Dein Passwort wurde erfolgreich geändert.', autoRemove: true})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <FormCard 
      heading="Passwort" 
      description="Lorem ipsum dolor sit amet."
      submitLabel="Passwort ändern"
      onSubmit={updatePassword}
      loading={formLoading}
      collapsable
    >
      <div className="lg:col-span-3 space-y-2">
        <Input type="password" id="password" label="Neues Passwort" placeholder="Passwort" onBlur={validatePassword} error={passwordError} ref={passwordRef}/>
        {passwordStrength && <PasswordStrength strength={passwordStrength}/>}
      </div>
      <Input className="lg:col-span-3" type="password" id="repeat-password" label="Passwort bestätigen" placeholder="Passwort" onBlur={validateRepeatPassword} error={repeatPasswordError} ref={repeatPasswordRef}/>
    </FormCard>
  )
}