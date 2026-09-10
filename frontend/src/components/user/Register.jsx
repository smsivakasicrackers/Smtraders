import { Fragment, useEffect, useState } from 'react'
import Footer from '../footer/Footer'
import MetaData from '../../Pages/Home/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, register } from '../../actions/userAction'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { Button } from '../ui'

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.authState)

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    formData.append('password', userData.password);
    dispatch(register(formData))
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
      return
    }
    if (error) {
      toast(error, {
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
    }
  }, [isAuthenticated, error, dispatch, navigate])

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <MetaData title={"Register"} />
      <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-paper-50 px-4 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="card-surface p-6 sm:p-8">
            <h1 className="font-display text-2xl font-semibold text-ink-900">
              Create Your Account
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Register to place orders and track your enquiries.
            </p>

            <form onSubmit={submitHandler} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name_field" className="mb-2 block text-sm font-medium text-ink-700">
                  Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  <input
                    id="name_field"
                    name="name"
                    type="text"
                    onChange={onChange}
                    placeholder="Name"
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email_field" className="mb-2 block text-sm font-medium text-ink-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  <input
                    id="email_field"
                    name="email"
                    type="email"
                    onChange={onChange}
                    placeholder="Email"
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password_field" className="mb-2 block text-sm font-medium text-ink-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  <input
                    id="password_field"
                    name="password"
                    type="password"
                    onChange={onChange}
                    placeholder="Password"
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
              <a href="/Login" className="text-ink-600 hover:text-crimson-700">
                Already have an account? <span className="font-semibold">Login</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}
