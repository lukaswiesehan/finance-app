import {useState, useEffect, useRef} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {FormCard} from '@/components/common/forms/form-card'
import {Input} from '@/components/common/forms/input'

export const BankSettings = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)
  
  const bankNameRef = useRef()
  const accountOwnerRef = useRef()
  const ibanRef = useRef()
  const bicRef = useRef()

  const [formLoading, setFormLoading] = useState(false)

  const [bankNameError, setBankNameError] = useState(null)
  const [accountOwnerError, setAccountOwnerError] = useState(null)
  const [ibanError, setIbanError] = useState(null)
  const [bicError, setBicError] = useState(null)

  useEffect(() => {
    getBusinessData()
  }, [session])

  const getBusinessData = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const {data, error, status} = await supabase
        .from('users')
        .select('business_bank_data')
        .eq('user_id', user.id)
        .single()
      if(error && status !== 406) {
        throw error
      } else if(data) {
        setLoading(false)
        bankNameRef.current.value = data.business_bank_data?.bank_name || null
        accountOwnerRef.current.value = data.business_bank_data?.account_owner || null
        ibanRef.current.value = data.business_bank_data?.iban || null
        bicRef.current.value = data.business_bank_data?.bic || null
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  const validateBankName = () => {
    if(bankNameRef.current.value == '') {
      setBankNameError('Bitte gib den Namen Deiner Bank ein.')
      return false
    } else {
      setBankNameError(null)
      return true
    }
  }

  const validateAccountOwner = () => {
    if(accountOwnerRef.current.value == '') {
      setAccountOwnerError('Bitte gib den Kontoinhaber ein.')
      return false
    } else {
      setAccountOwnerError(null)
      return true
    }
  }

  const validateIban = () => {
    if(ibanRef.current.value == '') {
      setIbanError('Bitte gib eine IBAN ein.')
      return false
    } else {
      setIbanError(null)
      return true
    }
  }

  const validateBic = () => {
    if(bicRef.current.value == '') {
      setBicError('Bitte gib einen BIC ein.')
      return false
    } else {
      setBicError(null)
      return true
    }
  }

  const validateAll = () => {
    const bankNameSuccess = validateBankName()
    const accountOwnerSuccess = validateAccountOwner()
    const ibanSuccess = validateIban()
    const bicSuccess = validateBic()
    return (bankNameSuccess && accountOwnerSuccess && ibanSuccess && bicSuccess)
  }

  const updateBankData = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      if(validateAll()) {
        const user = supabase.auth.user()
        const {error} = await supabase.from('users').upsert({
          user_id: user.id,
          business_bank_data: {
            bank_name: bankNameRef.current.value,
            account_owner: accountOwnerRef.current.value,
            iban: ibanRef.current.value,
            bic: bicRef.current.value
          },
          updated_at: new Date()
        }, {returning: 'minimal'})
        if(error) throw error
        showNotification({type: 'success', text: 'Deine Bankdaten wurden gespeichert.', autoRemove: true})
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <FormCard 
      heading="Bankverbindung" 
      description="Lorem ipsum dolor sit amet."
      submitLabel="Bankdaten speichern"
      onSubmit={updateBankData}
      loading={formLoading}
    >
      <Input className="col-span-3" type="text" id="bank-name" label="Name der Bank" placeholder="Acme Bank AG" onBlur={validateBankName} error={bankNameError} ref={bankNameRef} skeleton={loading}/>
      <Input className="col-span-3" type="text" id="bank-account-owner" label="Kontoinhaber" placeholder="John Doe" onBlur={validateAccountOwner} error={accountOwnerError} ref={accountOwnerRef} skeleton={loading}/>
      <Input className="col-span-4" type="text" id="iban" label="IBAN" placeholder="DE00 0000 0000 0000 0000 00" onBlur={validateIban} error={ibanError} ref={ibanRef} skeleton={loading}/>
      <Input className="col-span-2" type="text" id="bic" label="BIC" placeholder="XXXXDE00XXX" onBlur={validateBic} error={bicError} ref={bicRef} skeleton={loading}/>
    </FormCard>
  )
}