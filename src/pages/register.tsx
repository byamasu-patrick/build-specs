import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useRouter } from "next/router";
import { encodeUrl } from "@/utils/common";
import { useState } from "react";
import SuccessAlert from "@/components/widget/success-alert";

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
      } else if (error) alert(error.message);
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
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
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
                Create Account
              </button>
            </div>
          </form>

          <p className="text-center text-sm leading-6 text-gray-500">
            Have an account yet?{" "}
            <Link
              href="/"
              className="font-semibold text-slate-900 focus:ring-slate-950"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
