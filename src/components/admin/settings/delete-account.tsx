import WarningModal from "@/components/widget/cars/delete-modal";
import SuccessAlert from "@/components/widget/success-alert";
import { deleteUserAccount } from "@/services/users-service/account-service";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeleteAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    isLoading: deleting,
    data: deletedData,
    isSuccess: isDeleteSuccess,
    mutate: deleteAccount,
  } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (isDeleteSuccess && !deleting) {
      setIsSuccess(true);
      setSuccessMessage(deletedData.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleting, isDeleteSuccess]);

  useEffect(() => {
    if (!isSuccess && isDeleteSuccess && !deleting) {
      supabaseClient.auth
        .signOut()
        .catch((error: unknown) => console.log(error))
        .finally(() => {
          void router.push("/");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      setIsWarningOpen(true);
    },
  });
  return (
    <>
      {
        <WarningModal
          handleDeletion={deleteAccount}
          isLoading={deleting}
          isWarningOpen={isWarningOpen}
          message="Are you sure you want to delete your account?"
          setIsWarningOpen={setIsWarningOpen}
          title="Delete account"
        />
      }
      {isSuccess && (
        <SuccessAlert
          isResendSuccessful={isSuccess}
          message={successMessage}
          setIsResendSuccessful={setIsSuccess}
        />
      )}

      <form
        className="flex items-start md:col-span-2"
        onSubmit={formik.handleSubmit}
      >
        <button
          type="submit"
          className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        >
          Yes, delete my account
        </button>
      </form>
    </>
  );
};

export default DeleteAccount;
