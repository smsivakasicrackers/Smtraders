import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../Pages/Home/MetaData";
import Footer from "../footer/Footer";
import { clearAuthError, login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "../ui";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isAuthenticated } = useSelector((state) => state.authState);
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setLoading(false);
        navigate(redirect);
      }, 1000); // Delay for smooth transition
    }
    if (error) {
      setLoading(false);
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError()); // Fixed missing ()
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title={"Login"} />
      <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-paper-50 px-4 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <img src="/images/logo.png" alt="SM Crackers logo" className="h-16 w-auto object-contain" />
          </div>

          <div className="card-surface p-6 sm:p-8">
            <h1 className="font-display text-2xl font-semibold text-ink-900">
              Sign into your account
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Welcome back — enter your details to continue.
            </p>

            <form onSubmit={submitHandler} className="mt-6 space-y-5">
              <div>
                <label htmlFor="email_field" className="mb-2 block text-sm font-medium text-ink-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  <input
                    id="email_field"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
              <a href="/Forgotpassword" className="text-crimson-600 hover:text-crimson-700">
                Forgot Password?
              </a>
              <a href="/Register" className="text-ink-600 hover:text-crimson-700">
                Don't have an account? <span className="font-semibold">Register Here</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
