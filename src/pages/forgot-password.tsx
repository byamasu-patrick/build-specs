import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { encodeUrl } from "@/utils/common";

// Define the validation schema
const signSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid Email address.")
    .required("Required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signSchema,
    onSubmit: async (values) => {
      const { data } = await supabaseClient.auth.resetPasswordForEmail(
        values.email
      );
      if (data)
        await router.push(
          `reset-password/?_q=${encodeUrl(values.email)}` as string
        );
    },
  });
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
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
              <label htmlFor="password" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="abc@hit.co.it"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center bg-slate-900 hover:bg-slate-950 rounded-md ring-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:ring-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Submit
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
  );
}
