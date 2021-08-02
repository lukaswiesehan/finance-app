import {useState, useEffect, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'
import {Switch} from '@/components/common/forms/switch'

export const TaxSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)
  
  const taxIdRef = useRef()
  const taxNumberRef = useRef()
  const [vatRequired, setVatRequired] = useState(false)
  const vatIdRef = useRef()

  const [formLoading, setFormLoading] = useState(false)

  const [taxIdError, setTaxIdError] = useState(null)
  const [taxNumberError, setTaxNumberError] = useState(null)

  useEffect(() => {
    getTaxData()
  }, [session])

  const getTaxData = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const {data, error, status} = await supabase
        .from('users')
        .select('business_tax_data')
        .eq('user_id', user.id)
        .single()
      if(error && status !== 406) {
        throw error
      } else if(data) {
        setLoading(false)
        taxIdRef.current.value = data.business_tax_data?.tax_id || null
        taxNumberRef.current.value = data.business_tax_data?.tax_number || null
        setVatRequired(data.business_tax_data?.vat_required || false)
        vatIdRef.current.value = data.business_tax_data?.vat_id || null
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  const validateTaxId = () => {
    if(taxIdRef.current.value == '') {
      setTaxIdError('Bitte gib Deine Steueridentifikationsnummer ein.')
      return false
    } else {
      setTaxIdError(null)
      return true
    }
  }

  const validateTaxNumber = () => {
    if(taxNumberRef.current.value == '') {
      setTaxNumberError('Bitte gib Deine Steuernummer ein.')
      return false
    } else {
      setTaxNumberError(null)
      return true
    }
  }

  const validateAll = () => {
    const taxIdSuccess = validateTaxId()
    const taxNumberSuccess = validateTaxNumber()
    return (taxIdSuccess && taxNumberSuccess)
  }

  const updateTaxData = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      if(validateAll()) {
        const user = supabase.auth.user()
        const {error} = await supabase.from('users').upsert({
          user_id: user.id,
          business_tax_data: {
            tax_id: taxIdRef.current.value,
            tax_number: taxNumberRef.current.value,
            vat_required: vatRequired,
            vat_id: vatIdRef.current.value
          },
          updated_at: new Date()
        }, {returning: 'minimal'})
        if(error) throw error
        showNotification({type: 'success', text: 'Deine Steuerdaten wurden gespeichert.', autoRemove: true})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <FormCard 
      heading="Steuerliche Informationen" 
      description="Lorem ipsum dolor sit amet."
      submitLabel="Steuerdaten speichern"
      onSubmit={updateTaxData}
      loading={formLoading}
    >
      <Input className="col-span-3" type="text" id="tax-id" label="Steueridentifikationsnummer" placeholder="01 234 567 890" onBlur={validateTaxId} error={taxIdError} ref={taxIdRef} skeleton={loading}/>
      <Input className="col-span-2" type="text" id="tax-number" label="Steuernummer" placeholder="12/345/67890" onBlur={validateTaxNumber} error={taxNumberError} ref={taxNumberRef} skeleton={loading}/>
      <div/>
      <Switch className="col-span-1" label="Umsatzsteuer" checked={vatRequired} onChange={setVatRequired}/>
      <Input className="col-span-2" type="text" id="tax-number" label="Umsatzsteuer-ID" placeholder="DE123456789" disabled={!vatRequired} ref={vatIdRef} skeleton={loading}/>
    </FormCard>
  )
}