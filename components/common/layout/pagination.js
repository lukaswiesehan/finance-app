import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/pro-solid-svg-icons'

export const Pagination = ({pageCount, currentPage, setCurrentPage}) => {
  var pages = [...Array(pageCount).keys()].map(page => ++page)
  if(pageCount > 5) {
    if(currentPage < 4) {
      pages.splice(3, pageCount - 4, '...')
    } else if(currentPage > pageCount - 3) {
      pages.splice(1, pageCount - 4, '...')
    } else if(pageCount > 6) {
      pages.splice(1, currentPage - 2, '...')
      pages.splice(3, pages.length - 4, '...')
    }
  }

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-true-gray-100 divide-x divide-gray-200">
      <button type="button" 
        className={`py-2 w-10 text-center rounded-lg focus:z-10 focus:border focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 
          ${currentPage == 1 ? 'text-gray-300 bg-gray-100 cursor-default' : 'transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25'}`} 
        onClick={() => {setCurrentPage(currentPage - 1)}} 
        disabled={currentPage == 1}
      >
        <FontAwesomeIcon icon={faChevronLeft}/>
      </button>
      {pages.map((page, index) => (
        page == '...' ? 
          <div key={index} className="py-2 w-10 text-center bg-gray-100">...</div> 
        : 
          <div>
            <button key={index} type="button" 
              className={`relative py-2 w-10 text-center border border-transparent focus:rounded-lg focus:z-10 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 
                ${currentPage == page && 'font-bold text-gray-800'} 
                transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25`}
              onClick={() => {setCurrentPage(page)}}
            >
              {page}
            </button>
          </div>
        ))}
      <div>
        <button type="button" 
          className={`relative p-2 w-10 text-center border border-transparent rounded-lg focus:z-10 focus:border focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 
            ${currentPage == pageCount ? 'text-gray-300 bg-gray-100 cursor-default' : 'transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25'}`}
          onClick={() => {setCurrentPage(currentPage + 1)}}
          disabled={currentPage == pageCount}
        >
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
      </div>
    </div>
  )
}