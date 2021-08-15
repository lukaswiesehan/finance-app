import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {validateNotEmpty, validateEmail} from '@/lib/validations'
import {Breadcrumbs} from '@/components/common/elements/breadcrumbs'
import {Title} from '@/components/common/elements/title'
import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {Subheading} from '@/components/common/elements/subheading'
import {Input} from '@/components/common/forms/input'
import {Submit} from '@/components/common/forms/submit'

export const NewCustomer = ({session}) => {
  const router = useRouter()
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(false)
  const [newCustomerId, setNewCustomerId] = useState('0000')
  
  const companyRef = useRef()
  const contactPersonRef = useRef()
  const streetRef = useRef()
  const numberRef = useRef()
  const postalRef = useRef()
  const cityRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const [formLoading, setFormLoading] = useState(false)
  const [companyError, setCompanyError] = useState(null)
  const [contactPersonError, setContactPersonError] = useState(null)
  const [streetError, setStreetError] = useState(null)
  const [numberError, setNumberError] = useState(null)
  const [postalError, setPostalError] = useState(null)
  const [cityError, setCityError] = useState(null)
  const [emailError, setEmailError] = useState(null)

  useEffect(() => {
    getNewCustomerId()
  }, [session])

  const getNewCustomerId = async () => {
    try{
      setLoading(true)
      const user = supabase.auth.user()
      const {data, error, status} = await supabase
        .from('customers')
        .select('customer_id')
        .eq('user_id', user.id)
      if(error && status !== 406) {
        throw error
      } else if(data) {
        setLoading(false)
        if(data.length === 0) {
          setNewCustomerId(7001)
        } else {
          const maxId = Math.max.apply(Math, data.map(c => {return c.customer_id}))
          setNewCustomerId(maxId + 1)
        }
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  const validateAll = () => {
    const companySuccess = validateNotEmpty({value: companyRef.current.value, setError: setCompanyError})
    const contactPersonSuccess = validateNotEmpty({value: contactPersonRef.current.value, setError: setContactPersonError})
    const streetSuccess = validateNotEmpty({value: streetRef.current.value, setError: setStreetError})
    const numberSuccess = validateNotEmpty({value: numberRef.current.value, setError: setNumberError})
    const postalSuccess = validateNotEmpty({value: postalRef.current.value, setError: setPostalError})
    const citySuccess = validateNotEmpty({value: cityRef.current.value, setError: setCityError})
    const emailSuccess = validateEmail({value: emailRef.current.value, setError: setEmailError})
    return (companySuccess && contactPersonSuccess && streetSuccess && numberSuccess && postalSuccess && citySuccess && emailSuccess)
  }

  const saveNewCustomer = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      if(validateAll()) {
        const user = supabase.auth.user()
        const {error} = await supabase.from('customers').insert({
          user_id: user.id,
          customer_id: newCustomerId,
          company: companyRef.current.value,
          contact_person: contactPersonRef.current.value,
          address: {
            street: streetRef.current.value,
            number: numberRef.current.value,
            postal: postalRef.current.value,
            city: cityRef.current.value
          },
          email: emailRef.current.value,
          phone: phoneRef.current.value || null,
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        }, {returning: 'minimal'})
        if(error) throw error
        showNotification({type: 'success', text: `Dein Kunde ${companyRef.current.value} wurde angelegt.`, autoRemove: true})
        router.push(`/customers/${newCustomerId}`)
      }
    } catch(error) {
      console.log(error)
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8 space-y-16 sm:mb-16 sm:space-y-0 sm:flex sm:justify-between">
        <div className="space-y-2">
          <Title>Neuer Kunde</Title>
          <Breadcrumbs elements={[
            {title: 'Kunden', href: '/customers'},
            {title: 'Neuer Kunde', href: '/customers/new'}
          ]}/>
        </div>
        <div className="sm:text-right space-y-2">
          <p className="text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-indigo-500">
              K#{newCustomerId}
            </span>
          </p>
          <h2 className="text-sm text-gray-600">Kundennummer</h2>
        </div>
      </div>
      <form onSubmit={saveNewCustomer} className="grid grid-cols-6 gap-8">
        <Card className="col-span-6 lg:col-span-3">
          <CardMain className="p-6 space-y-6">
            <div>
              <Subheading>Unternehmen</Subheading>  
              <p>Angaben zum Unternehmen.</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <Input className="col-span-6 sm:col-span-5 lg:col-span-6 xl:col-span-5" 
                type="text" id="company" label="Unternehmen" placeholder="Acme Inc." 
                onBlur={() => {validateNotEmpty({value: companyRef.current.value, setError: setCompanyError})}} 
                error={companyError} ref={companyRef} skeleton={loading}
              />
              <Input className="col-span-6 sm:col-span-5 lg:col-span-6 xl:col-span-5" 
                type="text" id="street" label="Straße" placeholder="Blaubeerweg" 
                onBlur={() => {validateNotEmpty({value: streetRef.current.value, setError: setStreetError})}} 
                error={streetError} ref={streetRef} skeleton={loading}
              />
              <Input className="col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1" 
                type="text" id="number" label="Hausnr." placeholder="12" 
                onBlur={() => {validateNotEmpty({value: numberRef.current.value, setError: setNumberError})}} 
                error={numberError} ref={numberRef} skeleton={loading}
              />
              <Input className="col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2" 
                type="text" id="postal" label="Postleitzahl" placeholder="12345" 
                onBlur={() => {validateNotEmpty({value: postalRef.current.value, setError: setPostalError})}} 
                error={postalError} ref={postalRef} skeleton={loading}
              />
              <Input className="col-span-6 sm:col-span-4 lg:col-span-6 xl:col-span-4" 
                type="text" id="city" label="Ort" placeholder="Buxtehude" 
                onBlur={() => {validateNotEmpty({value: cityRef.current.value, setError: setCityError})}}
                error={cityError} ref={cityRef} skeleton={loading}
              />
            </div>
          </CardMain>
        </Card>
        <Card className="col-span-6 lg:col-span-3">
          <CardMain className="p-6 space-y-6">
            <div>
              <Subheading>Ansprechpartner</Subheading>  
              <p>Deine Kontaktperson beim Kunden.</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <Input className="col-span-6 sm:col-span-5" 
                type="text" id="contact-person" label="Name" placeholder="John Doe" 
                onBlur={() => {validateNotEmpty({value: contactPersonRef.current.value, setError: setContactPersonError})}} 
                error={contactPersonError} ref={contactPersonRef} skeleton={loading}
              />
              <Input className="col-span-6" 
                type="text" id="email" label="Email-Adresse" placeholder="john.doe@acme.com" 
                onBlur={() => {validateEmail({value: emailRef.current.value, setError: setEmailError})}}
                error={emailError} ref={emailRef} skeleton={loading}
              />
              <Input className="col-span-6 sm:col-span-5 xl:col-span-4" 
                type="text" id="phone" label="Telefonnummer" placeholder="+49 174 123 456" 
                ref={phoneRef} skeleton={loading}
              />
            </div>
          </CardMain>
        </Card>
        <div className="col-span-6 flex justify-end">
          <Submit label="Kunden anlegen" loading={formLoading}/>
        </div>
      </form>
    </div>
  )
}