import { Dispatch, SetStateAction } from "react";

export type AlertSuccessProps = {
  message: string;
  isResendSuccessful: boolean;
  setIsResendSuccessful: Dispatch<SetStateAction<boolean>>;
};
