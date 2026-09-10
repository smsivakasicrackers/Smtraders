import { Fragment, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import MetaData from "../../Pages/Home/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import { Button } from "../ui";

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const { error, message } = useSelector(state => state.authState)
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email)
    dispatch(forgotPassword(formData))
  }

  useEffect(() => {
    if (message) {
      toast(message, {
        type: 'success',
      })
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return
    }
  }, [message, error, dispatch])

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-paper-50 px-4 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="card-surface p-6 sm:p-8">
            <h1 className="font-display text-2xl font-semibold text-ink-900">
              Forgot Password
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Enter your account email and we'll send you a reset link.
            </p>

            <form onSubmit={submitHandler} className="mt-6 space-y-5">
              <div>
                <label htmlFor="email_field" className="mb-2 block text-sm font-medium text-ink-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  <input
                    type="email"
                    id="email_field"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                  />
                </div>
              </div>

              <Button id="forgot_password_button" type="submit" variant="primary" size="lg" className="w-full">
                Send Email
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}
