import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faSortUp, faSortDown} from '@fortawesome/pro-duotone-svg-icons'

export const Table = ({columns, orderBy, setOrderBy, bottomSection, children}) => {
  return (
    <div className="relative overflow-hidden w-full bg-gray-50 rounded-2xl border border-gray-200">
      <div className="rounded-2xl overflow-x-scroll">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-500">
            <tr>
              {columns.map(({title, sortable, id}, index) => (
                <th key={index} scope="col" className="p-4 sm:p-6 text-left whitespace-nowrap">
                  {sortable ? 
                    orderBy.column == id ? 
                      orderBy.ascending ? 
                        <button type="button" className="flex items-center space-x-2 transition-none focus:outline-none focus:underline" onClick={() => {setOrderBy({column: id, ascending: false})}}>
                          <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
                          <FontAwesomeIcon icon={faSortUp} className="text-base"/>
                        </button>
                      : 
                        <button type="button" className="flex items-center space-x-2 transition-none focus:outline-none focus:underline" onClick={() => {setOrderBy({column: id, ascending: true})}}>
                          <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
                          <FontAwesomeIcon icon={faSortDown} className="text-base"/>
                        </button>
                    : 
                      <button type="button" className="flex items-center space-x-2 transition-none focus:outline-none focus:underline" onClick={() => {setOrderBy({column: id, ascending: true})}}>
                        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
                        <FontAwesomeIcon icon={faSort} className="text-base"/>
                      </button>
                  :
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {title}
                    </span>
                  }  
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-500">
            {children}
          </tbody>
        </table>
      </div>
      {bottomSection && 
        <div className="p-4 sm:p-6 bg-gray-100 border-t border-gray-200">
          {bottomSection}
        </div>
      }
    </div>
  )
}