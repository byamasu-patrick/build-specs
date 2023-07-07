import { AlertSuccessProps } from "@/types/props-type/widget-props";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function ErrorAlert({
  message,
  setIsResendSuccessful,
}: AlertSuccessProps) {
  useEffect(() => {
    setTimeout(() => {
      setIsResendSuccessful(false);
    }, 3000);
  });
  return (
    <div className="rounded-md bg-red-50 p-3 w-96 absolute top-4 right-4 z-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-normal text-red-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
