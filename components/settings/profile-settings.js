import {useState, useEffect, useRef} from 'react'
import {isMatch as matchDate, parse as parseDate, format as formatDate} from 'date-fns'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {SettingsSection} from '@/components/settings/settings-section'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'
import {PasswordStrength} from '@/components/common/forms/password-strength'

export const ProfileSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const birthdayRef = useRef()
  const [profileFormLoading, setProfileFormLoading] = useState(false)
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [birthdayError, setBirthdayError] = useState(null)

  const emailRef = useRef()
  const repeatEmailRef = useRef()
  const [emailFormLoading, setEmailFormLoading] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [repeatEmailError, setRepeatEmailError] = useState(null)

  const passwordRef = useRef()
  const repeatPasswordRef = useRef()
  const [passwordFormLoading, setPasswordFormLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [repeatPasswordError, setRepeatPasswordError] = useState(null)

  // Initial Loading Stuff

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      emailRef.current.value = user.email
      repeatEmailRef.current.value = user.email
      const {data, error, status} = await supabase
        .from('users')
        .select('first_name, last_name, birthday')
        .eq('user_id', user.id)
        .single()
      if(error && status !== 406) {
        throw error
      } else if(data) {
        setLoading(false)
        firstNameRef.current.value = data.first_name
        lastNameRef.current.value = data.last_name
        birthdayRef.current.value = data.birthday ? formatDate(new Date(data.birthday), 'dd.MM.yyyy') : null
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  // Profile Stuff

  const validateFirstName = () => {
    if(firstNameRef.current.value == '') {
      setFirstNameError('Bitte gib Deinen Vornamen ein.')
      return false
    } else {
      setFirstNameError(null)
      return true
    }
  }

  const validateLastName = () => {
    if(lastNameRef.current.value == '') {
      setLastNameError('Bitte gib Deinen Nachnamen ein.')
      return false
    } else {
      setLastNameError(null)
      return true
    }
  }

  const validateBirthday = () => {
    if(birthdayRef.current.value == '') {
      setBirthdayError('Bitte gib Deinen Geburtstag ein.')
      return false
    } else if(!matchDate(birthdayRef.current.value, 'dd.MM.yyyy') || parseDate(birthdayRef.current.value, 'dd.MM.yyyy', new Date()).getFullYear() < 1900) {
      setBirthdayError("Das Datum muss dem Format 'TT.MM.JJJJ' entsprechen.")
      return false
    } else {
      setBirthdayError(null)
      return true
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      setProfileFormLoading(true)
      const firstNameSuccess = validateFirstName()
      const lastNameSuccess = validateLastName()
      const birthdaySuccess = validateBirthday()
      if(firstNameSuccess && lastNameSuccess && birthdaySuccess) {
        const user = supabase.auth.user()
        const {error} = await supabase.from('users').upsert({
          user_id: user.id,
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          birthday: formatDate(parseDate(birthdayRef.current.value, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
          updated_at: new Date()
        }, {returning: 'minimal'})
        if(error) throw error
        showNotification({type: 'success', text: 'Dein Profil wurde gespeichert.', autoRemove: true})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setProfileFormLoading(false)
    }
  }

  // Email Stuff

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
      setEmailFormLoading(true)
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
      setEmailFormLoading(false)
    }
  }

  // Password Stuff

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
      setPasswordFormLoading(true)
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
      setPasswordFormLoading(false)
    }
  }

  // Render Component

  return (
    <SettingsSection heading="Profil & Zugang" description="Richte hier dein Profil ein, mit dem Du auf dein Finance Dashboard zugreifst.">
      <FormCard 
        heading="Persönliche Informationen" 
        description="Lorem ipsum dolor sit amet."
        columns="3"
        submitLabel="Speichern"
        onSubmit={updateProfile}
        loading={profileFormLoading}
      >
        <Input className="col-span-2" type="text" id="first-name" label="Dein Vorname" placeholder="John" onBlur={validateFirstName} error={firstNameError} ref={firstNameRef} skeleton={loading}/>
        <Input className="col-span-3" type="text" id="last-name" label="Dein Nachname" placeholder="Doe" onBlur={validateLastName} error={lastNameError} ref={lastNameRef} skeleton={loading}/>
        <Input className="col-span-2" type="text" id="last-name" label="Dein Geburtstag" placeholder="TT.MM.JJJJ" onBlur={validateBirthday} error={birthdayError} ref={birthdayRef} skeleton={loading}/>
      </FormCard>
      <FormCard 
        heading="Email-Adresse" 
        description="Lorem ipsum dolor sit amet."
        columns="2"
        submitLabel="Speichern"
        onSubmit={updateEmail}
        loading={emailFormLoading}
        collapsable
      >
        <Input className="col-span-3" type="email" id="email" label="Deine Email-Adresse" placeholder="john.doe@email.com" onBlur={validateEmail} error={emailError} ref={emailRef}/>
        <Input className="col-span-3" type="email" id="repeat-email" label="Email-Adresse bestätigen" placeholder="john.doe@email.com" onBlur={validateRepeatEmail} error={repeatEmailError} ref={repeatEmailRef}/>
      </FormCard>
      <FormCard 
        heading="Passwort" 
        description="Lorem ipsum dolor sit amet."
        columns="2"
        submitLabel="Passwort ändern"
        onSubmit={updatePassword}
        loading={passwordFormLoading}
        collapsable
      >
        <div className="col-span-3 space-y-2">
          <Input type="password" id="password" label="Neues Passwort" placeholder="Passwort" onBlur={validatePassword} error={passwordError} ref={passwordRef}/>
          {passwordStrength && <PasswordStrength strength={passwordStrength}/>}
        </div>
        <Input className="col-span-3" type="password" id="repeat-password" label="Passwort bestätigen" placeholder="Passwort" onBlur={validateRepeatPassword} error={repeatPasswordError} ref={repeatPasswordRef}/>
      </FormCard>
    </SettingsSection>
  )
}