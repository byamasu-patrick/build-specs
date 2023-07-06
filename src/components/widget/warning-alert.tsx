import { AlertSuccessProps } from "@/types/props-type/widget-props";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function WarningAlert({
  message,
  setIsResendSuccessful,
}: AlertSuccessProps) {
  useEffect(() => {
    setTimeout(() => {
      setIsResendSuccessful(false);
    }, 2000);
  });
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {message}.{" "}
            {/* <a
              href="#"
              className="font-medium text-yellow-700 underline hover:text-yellow-600"
            >
              Upgrade your account to add more credits.
            </a> */}
          </p>
        </div>
      </div>
    </div>
  );
}
