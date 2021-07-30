import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronCircleDown} from '@fortawesome/pro-duotone-svg-icons'

import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {CardBottom} from '@/components/common/layout/card-bottom'
import {Subheading} from '@/components/common/elements/subheading'
import {Submit} from '@/components/common/forms/submit'

export const FormCard = ({heading, description, submitLabel, onSubmit, loading, collapsable, children}) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardMain className="p-6 space-y-6">
          {collapsable ? 
            <div onClick={() => {setCollapsed(!collapsed)}} className="group w-full text-left flex justify-between items-center focus:outline-none cursor-pointer" tabIndex="0">
              <div>
                <h3><Subheading>{heading}</Subheading></h3>
                <p>{description}</p>
              </div>
              <FontAwesomeIcon icon={faChevronCircleDown} className={`text-xl rounded-full text-gray-800 group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-800 group-focus:ring-offset-2 group-focus:ring-offset-gray-50 transform transition-transform duration-200 ease-in-out ${!collapsed && '-rotate-180'}`}/>
            </div>
          : 
            <div>
              <h3><Subheading>{heading}</Subheading></h3>
              <p>{description}</p>
            </div>
          }
          <div hidden={collapsable && collapsed}>
            <div className="grid grid-cols-6 gap-4">
              {children}
            </div>
          </div>
        </CardMain>
        <div hidden={collapsable && collapsed}>
          <CardBottom className="px-6 py-3" hidden={collapsable && collapsed}>
            <div className="w-full flex justify-end">
              <Submit label={submitLabel} loading={loading}/>
            </div>
          </CardBottom>
        </div>
      </form>
      
    </Card>
  )
}