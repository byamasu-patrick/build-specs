import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useRouter } from "next/router";
import { decodeUrl } from "@/utils/common";
import { useEffect } from "react";
import { VerifyEmailOtpParams } from "@supabase/supabase-js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ParsedUrlQuery } from "querystring";
import Loading from "@/components/widget/loading-spinner";

const signupSchema = Yup.object().shape({
  token: Yup.string()
    .min(6, "Must be 6 characters")
    .max(6, "Must be 6 characters!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Your password is too short")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Your password is too short")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

async function resetPassword(values: {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const verifyParams = {
    email: values.email,
    token: values.token,
    type: "recovery",
  } as VerifyEmailOtpParams;

  const { data, error } = await supabaseClient.auth.verifyOtp(verifyParams);

  if (error) {
    return error;
  } else if (data && data.session) {
    const { data: updatedUser } = await supabaseClient.auth.updateUser({
      password: values.password,
    });
    return updatedUser;
  }
}
export default function ResetPassword() {
  // Access the client
  const queryClient = useQueryClient();
  const router = useRouter();
  const params: ParsedUrlQuery = router.query;

  // console.log(decodeUrl(_q as string));

  const initialValues: {
    token: string;
    password: string;
    confirmPassword: string;
  } = {
    token: "",
    password: "",
    confirmPassword: "",
  };
  const {
    isLoading,
    data,
    error,
    isSuccess,
    mutate: resetPasswordMutation,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      resetPasswordMutation({
        ...values,
        email: decodeUrl(params["_q"] as string as string),
      });
    },
  });

  useEffect(() => {
    if (data && isSuccess && !error) {
      void router.push("/");
    } else if (error) console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isSuccess]);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
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
              <label htmlFor="token" className="sr-only">
                token
              </label>
              <input
                id="token"
                {...formik.getFieldProps("token")}
                type="text"
                autoComplete="token"
                required
                className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Otp"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                New password
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
                Retype Password
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
              {isLoading && !error ? <Loading /> : "Reset"}
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
