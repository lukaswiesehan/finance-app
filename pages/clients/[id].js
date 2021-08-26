import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'
import {Breadcrumbs} from '@/components/common/elements/breadcrumbs'
import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {Subheading} from '@/components/common/elements/subheading'
import {EmailLink} from '@/components/common/elements/email-link'
import {PhoneLink} from '@/components/common/elements/phone-link'




import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBriefcase, faUserTie, faMoneyBillWave} from '@fortawesome/pro-duotone-svg-icons'





const CustomerPage = ({session}) => {
  const router = useRouter()
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkCustomerId()
  }, [router.query])

  const checkCustomerId = async () => {
    try{
      const {id} = router.query
      if(id) {
        const user = supabase.auth.user()
        const {data, error, status} = await supabase
          .from('clients')
          .select('*')
          .eq('user_id', user.id)
          .eq('client_id', id)
          .single()
        if(error && status !== 406) {
          throw error
        } else if(status === 406) {
          router.push('/404')
        } else {
          setLoading(false)
          setClient(data)
        }
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    }
  }

  return (
    <Container>
      <AppCanvas>
        <div className="mb-8 space-y-16 sm:mb-16 sm:space-y-0 sm:flex sm:justify-between">
          <div className="space-y-2">
            <Title skeleton={loading}>{client?.company}</Title>
            <Breadcrumbs elements={[
              {title: 'Kunden', href: '/clients'},
              {title: client?.client_id, href: `/clients/${client?.client_id}`}
            ]} skeletonLength={3} skeleton={loading}/>
          </div>
          <div className="sm:text-right space-y-2">
            <p className="text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-indigo-500">
                K#{client?.client_id || 7000}
              </span>
            </p>
            <h2 className="text-sm text-gray-600">Kundennummer</h2>
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-6 gap-8">
          <Card className="col-span-6 md:col-span-3 lg:col-span-2">
            <CardMain className="p-6 space-y-6">
              <div className="flex space-x-6">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 border border-gray-300 text-xl">
                  <FontAwesomeIcon icon={faBriefcase}/>
                </div>
                <div>
                  <p className="mb-2"><Subheading>Unternehmen</Subheading></p>
                  <p>{client?.company}</p>
                  <p>{`${client?.address.street} ${client?.address.number}`}</p>
                  <p>{`${client?.address.postal} ${client?.address.city}`}</p>
                </div>
              </div>
            </CardMain>
          </Card>
          <Card className="col-span-6 md:col-span-3 lg:col-span-2">
            <CardMain className="p-6 space-y-6">
              <div className="flex space-x-6">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 border border-gray-300 text-xl">
                  <FontAwesomeIcon icon={faUserTie}/>
                </div>
                <div>
                  <p className="mb-2"><Subheading>Ansprechpartner</Subheading></p>
                  <p>{client?.contact_person}</p>
                  <p><EmailLink email={client?.email} name={client?.contact_person}/></p>
                  <p><PhoneLink phone={client?.phone}/></p>
                </div>
              </div>
            </CardMain>
          </Card>
          <Card className="col-span-6 md:col-span-3 lg:col-span-2">
            <CardMain className="p-6 space-y-6">
              <div className="flex space-x-6">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 border border-gray-300 text-xl">
                  <FontAwesomeIcon icon={faMoneyBillWave}/>
                </div>
                <div>
                  <p><Subheading>26.795 €</Subheading></p>
                  <p>Netto-Umsatz</p>
                </div>
              </div>
            </CardMain>
          </Card>
        </div>



        <div className="h-96"></div>
      </AppCanvas>
    </Container>
  )
}

export default CustomerPage