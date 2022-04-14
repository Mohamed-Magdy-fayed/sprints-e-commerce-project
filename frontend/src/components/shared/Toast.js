import { useContext, useEffect } from "react"
import ToastContext from "../../context/toast/ToastContext"

const Toast = () => {

    const { state, hideToast } = useContext(ToastContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            hideToast()
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isToast])

    return (
        <div id="toast" className={`${state.isToast ? 'translate-x-0' : 'translate-x-96'} transition relative flex items-center w-full max-w-xs p-4 mb-4 text-gray-700 bg-white rounded-lg shadow-md dark:text-gray-400 dark:bg-gray-800" role="alert`}>
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${state.isSuccess ? 'text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200' : 'text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200'} rounded-lg `}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div className="ml-3 text-sm font-normal">{state.text}</div>
            <button onClick={() => hideToast()} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )
}

export default Toast