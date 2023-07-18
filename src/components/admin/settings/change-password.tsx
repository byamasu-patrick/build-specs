import Loading from "@/components/widget/loading-spinner";
import SuccessAlert from "@/components/widget/success-alert";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import { useState } from "react";

type InitialProps = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

const ChangePassword = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const user = useUser();

  const handleSubmit = async (values: InitialProps) => {
    setIsUpdating(true);
    const { data: updatedUser, error: updatedError } =
      await supabaseClient.auth.updateUser({
        password: values.new_password as string,
      });

    if (updatedUser && !updatedError) {
      setIsSuccess(true);
      setSuccessMessage("Password successfully updated");
      setIsUpdating(false);
    }
  };

  const initialValues: InitialProps = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form className="md:col-span-2" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            {isSuccess && (
              <SuccessAlert
                isResendSuccessful={isSuccess}
                message={successMessage}
                setIsResendSuccessful={setIsSuccess}
              />
            )}
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              Current password
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                {...formik.getFieldProps("current_password")}
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                {...formik.getFieldProps("new_password")}
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                {...formik.getFieldProps("confirm_password")}
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            {isUpdating ? (
              <>
                <Loading /> Updating
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
