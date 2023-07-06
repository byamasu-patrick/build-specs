import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { decodeUrl, encodeUrl } from "@/utils/common";
import {
  AuthResponse,
  ResendParams,
  VerifyEmailOtpParams,
  VerifyOtpParams,
} from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import SuccessAlert from "@/components/widget/success-alert";
import { ParsedUrlQuery } from "querystring";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// Define the validation schema
const signSchema = Yup.object().shape({
  token: Yup.string()
    .min(6, "Must be 6 characters")
    .max(6, "Must be 6 characters!")
    .required("Required"),
});

async function verifyAccount(values: { token: string; email: string }) {
  const verifyParams = {
    email: values.email,
    token: values.token,
    type: "signup",
  } as VerifyEmailOtpParams;

  return await supabaseClient.auth.verifyOtp(verifyParams);
}

export default function ForgotPassword() {
  // Access the client
  const queryClient = useQueryClient();
  const [isResendSuccessful, setIsResendSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const params: ParsedUrlQuery = router.query;
  const _q = params["_q"] as string;

  const initialValues: { token: string } = {
    token: "",
  };

  const {
    data,
    error,
    isSuccess,
    mutate: verifyAccountMutation,
  } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  useEffect(() => {
    if (data && isSuccess && !error) {
      setMessage("Your email has successfully been verified");
      setIsResendSuccessful(true);
      setTimeout(() => {
        void router.push("/");
      }, 1000);
    } else if (error) console.log(error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess, data]);

  const formik = useFormik({
    initialValues,
    validationSchema: signSchema,
    onSubmit: async (values) => {
      verifyAccountMutation({ ...values, email: _q });
    },
  });

  const resendEmail = async () => {
    try {
      const { data, error } = await supabaseClient.auth.resend({
        email: _q,
        type: "signup",
      } as ResendParams);

      if (error) alert(error.message);
      else if (data && !error) {
        setMessage("Code has been sent to your email");
        setIsResendSuccessful(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              Activate account
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-slate-900 hover:bg-slate-950 rounded-md ring-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:ring-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Verify
              </button>
            </div>

            <p className="text-center px-2 text-sm leading-6 text-gray-500">
              Did not receive an email?{" "}
              <button
                type="button"
                onClick={() =>
                  resendEmail().catch((error) => console.log(error))
                }
                className="font-semibold px-2 text-slate-800 focus:ring-slate-950 hover:text-slate-950 focus:border focus:border-dashed  focus:border-spacing-2 focus:rounded-md"
              >
                Resend code
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
