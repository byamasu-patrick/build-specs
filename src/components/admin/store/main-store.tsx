import { classNames } from "@/utils/common";
import { useState } from "react";
import NewCarItem from "./new-item";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { getClient } from "@/services/supabase-service";
import { useQuery } from "@tanstack/react-query";
import { CreateCarOptionsSchemaType } from "@/types/zod-schema/cars-option-schema";
import { ResponseType } from "@/types/api/api-schema";

async function getCarsFromSupabase(): Promise<
  CreateCarOptionsSchemaType[] | []
> {
  const { data } = await supabaseClient.auth.getSession();
  const response = (await getClient(
    "/api/cars/get-cars-by-user",
    data.session?.access_token as string
  )) as ResponseType;

  return response.data as CreateCarOptionsSchemaType[];
}
export function MainStore() {
  const [isNewCar, setIsNewCar] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: carsData,
    error: carsError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCarsFromSupabase,
  });

  console.log(carsData);
  // convertUnderscoreToCamelCase
  const renderCardOptionInfos = () => (
    <table className="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Make
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Model
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Version
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Engine Size
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Build Date
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Doors
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Fuel
          </th>

          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
          >
            <span className="sr-only">Edit</span>
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
                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
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
                    "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                  )}
                >
                  <a href="#" className="text-slate-800 hover:text-slate-950">
                    Edit<span className="sr-only">, {car.make}</span>
                  </a>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );

  return (
    <>
      {isNewCar && <NewCarItem isNewCar={isNewCar} setIsNewCar={setIsNewCar} />}
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
