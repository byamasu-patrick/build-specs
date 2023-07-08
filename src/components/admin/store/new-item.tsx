import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreateForm } from "./create-form";
import { CreateCarOptionsSchemaType } from "@/types/zod-schema/cars-option-schema";
import UpdateForm from "./update-form";

type ItemProps = {
  isNewCar: boolean;
  setIsNewCar: Dispatch<SetStateAction<boolean>>;
} & (
  | {
      car: CreateCarOptionsSchemaType;
      formType: "update";
    }
  | {
      formType: "create";
    }
);

export default function NewCarItem(props: ItemProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.isNewCar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setIsNewCar}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 h-auto text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[65%] sm:p-6">
                <div>
                  <div className="mt-3 text-start sm:mt-5">
                    <div className="mt-2 pb-6">
                      {props.formType === "create" ? (
                        <CreateForm setIsNewCar={props.setIsNewCar} />
                      ) : (
                        <UpdateForm
                          car={props.car}
                          setShowUpdateModal={props.setIsNewCar}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
