import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'

const CustomerPage = ({session}) => {
  const router = useRouter()
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [customer, setCustomer] = useState(null)
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
          .from('customers')
          .select('id, company')
          .eq('user_id', user.id)
          .eq('customer_id', id)
          .single()
        if(error && status !== 406) {
          throw error
        } else if(status === 406) {
          router.push('/404')
        } else {
          setLoading(false)
          setCustomer(data)
        }
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    }
  }

  return (
    <Container>
      <AppCanvas>
        <Title>{customer?.company}</Title>
        {/* BREADCRUMBS */}

      </AppCanvas>
    </Container>
  )
}

export default CustomerPage