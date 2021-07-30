import {useState, useEffect, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {SettingsSection} from '@/components/settings/settings-section'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'

export const BusinessSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)
  
  const businessNameRef = useRef()
  const businessStreetRef = useRef()
  const businessPostalRef = useRef()
  const businessCityRef = useRef()
  const businessEmailRef = useRef()
  const businessPhoneRef = useRef()
  const businessWebsiteRef = useRef()
  const [contactDataFormLoading, setContactDataFormLoading] = useState(false)
  const [businessNameError, setBusinessNameError] = useState(null)
  const [businessStreetError, setBusinessStreetError] = useState(null)
  const [businessPostalError, setBusinessPostalError] = useState(null)
  const [businessCityError, setBusinessCityError] = useState(null)
  const [businessEmailError, setBusinessEmailError] = useState(null)

  // Initial Loading Stuff

  useEffect(() => {
    getBusinessData()
  }, [session])

  const getBusinessData = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const {data, error, status} = await supabase
        .from('users')
        .select('business_name, business_contact_data')
        .eq('user_id', user.id)
        .single()
      if(error && status !== 406) {
        throw error
      } else if(data) {
        setLoading(false)
        businessNameRef.current.value = data.business_name
        businessStreetRef.current.value = data.business_contact_data?.street || null
        businessPostalRef.current.value = data.business_contact_data?.postal || null
        businessCityRef.current.value = data.business_contact_data?.city || null
        businessEmailRef.current.value = data.business_contact_data?.email || null
        businessPhoneRef.current.value = data.business_contact_data?.phone || null
        businessWebsiteRef.current.value = data.business_contact_data?.website || null
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  // Business Contact Data Stuff

  const validateBusinessName = () => {
    if(businessNameRef.current.value == '') {
      setBusinessNameError('Bitte gib die Bezeichnung Deines Unternehmens ein.')
      return false
    } else {
      setBusinessNameError(null)
      return true
    }
  }

  const validateBusinessStreet = () => {
    if(businessStreetRef.current.value == '') {
      setBusinessStreetError('Bitte gib Straße und Hausnummer Deines Unternehmens ein.')
      return false
    } else {
      setBusinessStreetError(null)
      return true
    }
  }

  const validateBusinessPostal = () => {
    if(businessPostalRef.current.value == '') {
      setBusinessPostalError('Bitte gib die Postleitzahl Deines Unternehmens ein.')
      return false
    } else {
      setBusinessPostalError(null)
      return true
    }
  }

  const validateBusinessCity = () => {
    if(businessCityRef.current.value == '') {
      setBusinessCityError('Bitte gib den Ort Deines Unternehmens ein.')
      return false
    } else {
      setBusinessCityError(null)
      return true
    }
  }

  const validateBusinessEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(businessEmailRef.current.value == '') {
      setBusinessEmailError('Bitte gib die Email-Adresse Deines Unternehmens ein.')
      return false
    } else if(!re.test(businessEmailRef.current.value.toLowerCase())) {
      setBusinessEmailError('Bitte gib eine korrekte Email-Adresse an.')
      return false
    } else {
      setBusinessEmailError(null)
      return true
    }
  }

  const validateAll = () => {
    const nameSuccess = validateBusinessName()
    const streetSuccess = validateBusinessStreet()
    const postalSuccess = validateBusinessPostal()
    const citySuccess = validateBusinessCity()
    const emailSuccess = validateBusinessEmail()
    return (nameSuccess && streetSuccess && postalSuccess && citySuccess && emailSuccess)
  }

  const updateContactData = async (e) => {
    e.preventDefault()
    try {
      setContactDataFormLoading(true)
      if(validateAll()) {
        const user = supabase.auth.user()
        const {error} = await supabase.from('users').upsert({
          user_id: user.id,
          business_name: businessNameRef.current.value,
          business_contact_data: {
            street: businessStreetRef.current.value,
            postal: businessPostalRef.current.value,
            city: businessCityRef.current.value,
            email: businessEmailRef.current.value,
            phone: businessPhoneRef.current.value,
            website: businessWebsiteRef.current.value
          },
          updated_at: new Date()
        }, {returning: 'minimal'})
        if(error) throw error
        showNotification({type: 'success', text: 'Dein Profil wurde gespeichert.', autoRemove: true})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setContactDataFormLoading(false)
    }
  }

  // Render Component

  return (
    <SettingsSection heading="Unternehmen" description="Gib hier die Details zu Deinem Unternehmen ein. Diese werden für die Rechnungstellung und weitere Funktionen benötigt.">
      <FormCard 
        heading="Anschrift & Kontaktdaten" 
        description="Lorem ipsum dolor sit amet."
        columns="2"
        submitLabel="Speichern"
        onSubmit={updateContactData}
        loading={contactDataFormLoading}
      >
        <Input className="col-span-5" type="text" id="business-name" label="Unternehmensbezeichnung" placeholder="Acme Inc." onBlur={validateBusinessName} error={businessNameError} ref={businessNameRef} skeleton={loading}/>
        <Input className="col-span-3" type="text" id="business-street" label="Straße & Hausnummer" placeholder="Blaubeerweg 1" onBlur={validateBusinessStreet} error={businessStreetError} ref={businessStreetRef} skeleton={loading}/>
        <Input type="text" id="business-postal" label="Postleitzahl" placeholder="21614" onBlur={validateBusinessPostal} error={businessPostalError} ref={businessPostalRef} skeleton={loading}/>
        <Input className="col-span-2" type="text" id="business-city" label="Ort" placeholder="Buxtehude" onBlur={validateBusinessCity} error={businessCityError} ref={businessCityRef} skeleton={loading}/>
        <Input className="col-span-3" type="email" id="business-email" label="Email-Adresse" placeholder="info@acme.de" onBlur={validateBusinessEmail} error={businessEmailError} ref={businessEmailRef} skeleton={loading}/>
        <Input className="col-span-3" type="phone" id="business-phone" label="Telefonnummer" placeholder="+49 174 234 98 76" ref={businessPhoneRef} skeleton={loading}/>
        <Input className="col-span-3" type="text" id="business-website" label="Website" placeholder="www.acme.de" ref={businessWebsiteRef} skeleton={loading}/>
      </FormCard>
    </SettingsSection>
  )
}