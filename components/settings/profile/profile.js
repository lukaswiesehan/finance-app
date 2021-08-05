import {useState, useEffect, useRef} from 'react'
import {isMatch as matchDate, parse as parseDate, format as formatDate} from 'date-fns'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'

export const ProfileSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const birthdayRef = useRef()
  const [formLoading, setFormLoading] = useState(false)
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [birthdayError, setBirthdayError] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
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
      setFormLoading(true)
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
      setFormLoading(false)
    }
  }

  return (
    <FormCard 
      heading="Persönliche Informationen" 
      description="Lorem ipsum dolor sit amet."
      submitLabel="Profil speichern"
      onSubmit={updateProfile}
      loading={formLoading}
    >
      <Input className="lg:col-span-2" type="text" id="first-name" label="Dein Vorname" placeholder="John" onBlur={validateFirstName} error={firstNameError} ref={firstNameRef} skeleton={loading}/>
      <Input className="lg:col-span-3" type="text" id="last-name" label="Dein Nachname" placeholder="Doe" onBlur={validateLastName} error={lastNameError} ref={lastNameRef} skeleton={loading}/>
      <Input className="lg:col-span-2" type="text" id="last-name" label="Dein Geburtstag" placeholder="TT.MM.JJJJ" onBlur={validateBirthday} error={birthdayError} ref={birthdayRef} skeleton={loading}/>
    </FormCard>
  )
}