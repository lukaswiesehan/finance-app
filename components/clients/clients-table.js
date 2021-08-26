import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'
import {Table} from '@/components/common/layout/table'
import {ChevronLink} from '@/components/common/elements/chevron-link'
import {EmailLink} from '@/components/common/elements/email-link'
import {PhoneLink} from '@/components/common/elements/phone-link'
import {Pagination} from '@/components/common/layout/pagination'

export const ClientsTable = ({session}) => {
  const supabase = useSupabase()
  const showNotification = useNotifications()

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [rowCount, setRowCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const rowsPerPageRef = useRef()
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState({column: 'client_id', ascending: true})
  
  useEffect(() => {
    getCustomers()
  }, [session, orderBy, currentPage, rowsPerPage])

  const getCustomers = async () => {
    try{
      setLoading(true)
      const user = supabase.auth.user()
      const {data, count, error, status} = await supabase
        .from('clients')
        .select('*', {count: 'exact'})
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order(orderBy.column, {ascending: orderBy.ascending})
        .range((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage - 1)
      if(error && status !== 406) {
        throw error
      } else {
        setRowCount(count)
        if(count) {
          setClients(data)
          setPageCount(Math.ceil(count / rowsPerPage))
        }
      }
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Table 
        columns={[
          {title: <span>Nummer</span>, sortable: true, id: 'client_id'},
          {title: <span>Unternehmen & Ansprechpartner</span>, sortable: true, id: 'company'},
          {title: <span>Adresse</span>, sortable: false},
          {title: <span>Email</span>, sortable: false},
          {title: <span>Telefon</span>, sortable: false},
          {title: <span className="sr-only">Anzeigen</span>, sortable: false}
        ]}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        bottomSection={
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">

            <div className="flex items-center space-x-4">
              <div className="w-18 rounded-lg bg-gradient-to-br from-gray-50 to-true-gray-100">
                <select className="w-full bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:border focus:border-gray-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                  name="customers-per-page" id="customers-per-page" 
                  ref={rowsPerPageRef} 
                  onChange={() => {setRowsPerPage(rowsPerPageRef.current.value)}}
                >
                  <option value="5">5</option>
                  <option value="10" selected>10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
              <label htmlFor="customers-per-page">Einträge pro Seite</label>
            </div>

            <Pagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

          </div>
        }
      >
        {loading ? 
          [...Array(7)].map((e, index) => (
            <tr key={index} className="animate-pulse">
              <td className="p-4 sm:p-6"><div className="w-16 h-6 rounded-lg bg-gray-200"/></td>
              <td className="p-4 sm:p-6"><div className="w-48 h-6 rounded-lg bg-gray-200"/><div className="mt-1 w-32 h-6 rounded-lg bg-gray-200"/></td>
              <td className="p-4 sm:p-6"><div className="w-40 h-6 rounded-lg bg-gray-200"/><div className="mt-1 w-48 h-6 rounded-lg bg-gray-200"/></td>
              <td className="p-4 sm:p-6"><div className="w-32 h-6 rounded-lg bg-gray-200"/></td>
              <td className="p-4 sm:p-6"><div className="w-24 h-6 rounded-lg bg-gray-200"/></td>
              <td className="p-4 sm:p-6"><div className="w-16 h-6 rounded-lg bg-gray-200"/></td>
            </tr>
          ))
        : rowCount == 0 ?
          <tr>
            <td colSpan="6">
              <div className="w-full h-96 flex justify-center items-center">
                <div className="text-center">
                  <p>Es sind noch keine Kunden vorhanden.</p>
                  <p className="font-bold">Lege jetzt Deinen ersten Kunden an!</p>
                </div>
              </div>
            </td>
          </tr>
        :
          clients.map(({client_id, company, contact_person, address, email, phone}, index) => (
            <tr key={index}>
              <td className="p-4 sm:p-6 whitespace-nowrap"><span className="px-2 py-0.5 bg-gray-300 text-gray-800 rounded-full text-sm font-bold uppercase tracking-wider">K#{client_id}</span></td>
              <td className="p-4 sm:p-6 whitespace-nowrap"><Link href={`/clients/${client_id}`}><a className="text-gray-600 font-bold focus:outline-none focus:underline">{company}</a></Link><br/>{contact_person}</td>
              <td className="p-4 sm:p-6 whitespace-nowrap">{address.street} {address.number}<br/>{address.postal} {address.city}</td>
              <td className="p-4 sm:p-6 whitespace-nowrap"><EmailLink email={email} name={contact_person}/></td>
              <td className="p-4 sm:p-6 whitespace-nowrap">{phone && <PhoneLink phone={phone}/>}</td>
              <td className="p-4 sm:p-6 whitespace-nowrap"><ChevronLink href={`/clients/${client_id}`}>Anzeigen</ChevronLink></td>         
            </tr>
          ))
        }
      </Table>
    </section>
  )
}