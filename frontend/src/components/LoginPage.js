import { LockClosedIcon } from '@heroicons/react/solid'
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const LoginPage = () => {

  // Connect to context
  const { state, loginUser } = useContext(UserContext)

  // Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (state.authed) navigate('/')
  }, [navigate, state])

  // Form On Submit
  const signIn = (e) => {
    e.preventDefault()

    const credentials = {
      email,
      password,
      rememberMe,
    }

    /* To Do send data to API to login */

    /* To Do set the app user state */
    // Fake api response
    const apiResponse = {
      name: 'megz',
      email: 'megz@gmail.com',
      authToken: 'Baerer token',
    }

    // Dispatch the action to the state
    loginUser(apiResponse)

    console.log(credentials)
  }

  // Form on forgot password
  const forgetPassword = () => {
    /* To Do hit password reset API */
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-1xl">Logo</h2>
            {/* ToDo add logo*/}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => signIn(e)} >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  value={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button onClick={() => forgetPassword()} type='button' className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
              <Link to='/register' type='button' className="mt-5 font-medium text-indigo-600 hover:text-indigo-500">
                Need an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage