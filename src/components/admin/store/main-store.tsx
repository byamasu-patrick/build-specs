import { classNames } from "@/utils/common";
import { useEffect, useState } from "react";
import NewCarItem from "./new-item";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCarFromSupabase,
  getCarsFromSupabase,
} from "@/services/car-option-service";
import WarningModal from "@/components/widget/cars/delete-modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CreateCarOptionsSchemaType } from "@/types/zod-schema/cars-option-schema";
import { UpdateForm } from "./update-form";

export function MainStore() {
  const queryClient = useQueryClient();
  const [isNewCar, setIsNewCar] = useState<boolean>(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState<boolean>(false);
  const [carOptions, setCarOptions] =
    useState<CreateCarOptionsSchemaType | null>();
  const [carId, setCarId] = useState<number>(-1);
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: carsData,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCarsFromSupabase,
  });

  const {
    isLoading: deleting,
    data: deletedData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    mutate: deleteCar,
  } = useMutation({
    mutationFn: deleteCarFromSupabase,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
  const handleCarDeletion = () => {
    if (carId !== -1) {
      deleteCar(carId);
    }
  };

  useEffect(() => {
    if (isDeleteSuccess && deletedData) {
      setIsWarningOpen(false);
    }
  }, [isDeleteSuccess, deleteError, deletedData]);

  // convertUnderscoreToCamelCase
  const renderCardOptionInfos = () => (
    <table className="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Make
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Model
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Version
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Engine Size
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Build Date
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Doors
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Fuel
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Edit
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-6"
          >
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {carsData && carsData?.length > 0
          ? carsData.map((car, carIndex) => (
              <tr key={car.id}>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-4 lg:pl-6"
                  )}
                >
                  {car.make}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                  )}
                >
                  {car.model}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                  )}
                >
                  {car.version}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {car.engine_size}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {car.build_date}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {car.doors}
                </td>
                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {car.fuel}
                </td>

                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium"
                  )}
                >
                  <button
                    onClick={() => {
                      setCarOptions(car);
                      setIsShowUpdateModal(true);
                    }}
                    className="text-slate-800 hover:text-slate-950"
                  >
                    Edit<span className="sr-only">, {car.make}</span>
                  </button>
                </td>

                <td
                  className={classNames(
                    carIndex !== carsData.length - 1
                      ? "border-b border-gray-200"
                      : "",
                    "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsWarningOpen(true);
                      setCarId(car.id);
                      //
                    }}
                  >
                    {" "}
                    <TrashIcon
                      width={20}
                      className="text-red-600 ml-6 hover:text-red-900"
                      height={20}
                    />
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );

  return (
    <>
      {isWarningOpen && (
        <WarningModal
          isLoading={deleting}
          isWarningOpen={isWarningOpen}
          setIsWarningOpen={setIsWarningOpen}
          message="Are you sure you want to delete this record?"
          title="Delete vehicle record"
          handleDeletion={handleCarDeletion}
        />
      )}

      {isNewCar && (
        <NewCarItem
          isNewCar={isNewCar}
          setIsNewCar={setIsNewCar}
          formType="create"
        />
      )}

      {carOptions && isShowUpdateModal && (
        <NewCarItem
          isNewCar={isShowUpdateModal}
          setIsNewCar={setIsShowUpdateModal}
          formType="update"
          car={carOptions}
        />
      )}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setIsNewCar(!isNewCar)}
              type="button"
              className="block rounded-md bg-slate-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              {carsData && renderCardOptionInfos()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainStore;
