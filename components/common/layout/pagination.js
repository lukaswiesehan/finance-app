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
        className={`py-2 w-10 text-center rounded-l-lg ${currentPage == 1 ? 'text-gray-300 bg-gray-100 cursor-default' : 'transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25'}`} 
        onClick={() => {setCurrentPage(currentPage - 1)}} 
        disabled={currentPage == 1}
      >
        <FontAwesomeIcon icon={faChevronLeft}/>
      </button>
      {pages.map((page, index) => (
        page == '...' ? 
          <div key={index} className="py-2 w-10 text-center bg-gray-100">...</div> 
        : 
          <button key={index} type="button" 
            className={`py-2 w-10 text-center ${currentPage == page && 'font-bold text-gray-800'} transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25`}
            onClick={() => {setCurrentPage(page)}}
          >
            {page}
          </button>
        ))}
      <button type="button" 
        className={`p-2 w-10 text-center rounded-r-lg ${currentPage == pageCount ? 'text-gray-300 bg-gray-100 cursor-default' : 'transition-none hover:text-gray-800 hover:bg-gray-200 hover:bg-opacity-25'}`}
        onClick={() => {setCurrentPage(currentPage + 1)}}
        disabled={currentPage == pageCount}
      >
        <FontAwesomeIcon icon={faChevronRight}/>
      </button>
    </div>
  )
}