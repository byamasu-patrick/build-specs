import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useRouter } from "next/router";
import { useState } from "react";
import SuccessAlert from "@/components/widget/success-alert";
import Loading from "@/components/widget/loading-spinner";

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .max(30, "Must be 30 characters or less!")
    .required("Required"),
  email: Yup.string().email("Invalid email address!").required("Required"),
  password: Yup.string()
    .min(8, "Your password is too short")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Your password is too short")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendSuccessful, setIsResendSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const { data, error } = await supabaseClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.username,
          },
        },
      });

      if (data && !error) {
        const email = values.email;
        setMessage(
          "An email has been sent to your account with a verification token"
        );
        setIsLoading(false);
        setIsResendSuccessful(true);
        setTimeout(() => {
          values = {
            confirmPassword: "",
            email: "",
            password: "",
            username: "",
          };

          void router.push(`verify-account/?_q=${email}` as string);
        }, 1000);
      } else if (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
  });

  return (
    <>
      {isResendSuccessful && (
        <SuccessAlert
          message={message}
          isResendSuccessful={isResendSuccessful}
          setIsResendSuccessful={setIsResendSuccessful}
        />
      )}
      <div className="flex min-h-full flex-1 items-center flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h2>
          </div>
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="user-name"
                  {...formik.getFieldProps("username")}
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  {...formik.getFieldProps("email")}
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...formik.getFieldProps("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Password
                </label>
                <input
                  id="confirm-password"
                  {...formik.getFieldProps("confirmPassword")}
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-slate-900 hover:bg-slate-950 rounded-md ring-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:ring-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {isLoading ? <Loading /> : "Create Account"}
              </button>
            </div>
          </form>
        </div>

        {/* <div className="mt-6 w-full max-w-sm">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">
                Or create an account with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span className="text-sm font-semibold leading-6">Twitter</span>
            </a>

            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div> */}
        <p className="text-center text-sm  mt-6 w-full max-w-sm leading-6 text-gray-500">
          Have an account yet?{" "}
          <Link
            href="/"
            className="font-semibold text-slate-900 focus:ring-slate-950"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
