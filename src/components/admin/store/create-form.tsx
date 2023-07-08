import Loading from "@/components/widget/loading-spinner";
import { postClient } from "@/services/supabase-service";
import {
  CarOptionsSchemaType,
  FormikCarOptionsSchemaType,
} from "@/types/zod-schema/cars-option-schema";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as Yup from "yup";

type ItemProps = {
  setIsNewCar: Dispatch<SetStateAction<boolean>>;
};

const createCarValidationSchema = Yup.object().shape({
  body: Yup.string().required("This field is required"),
  buildDate: Yup.string().required("This field is required"),
  doors: Yup.number().integer().required("This field is required"),
  engineSize: Yup.number().required("This field is required"),
  fuel: Yup.string().required("This field is required"),
  make: Yup.string().required("This field is required"),
  model: Yup.string().required("This field is required"),
  modelYear: Yup.number()
    .integer("This field is required")
    .required("Required"),
  trim: Yup.string().required("This field is required"),
  version: Yup.string().required("This field is required"),
});

async function createCarInformation(values: FormikCarOptionsSchemaType) {
  const carOptions: CarOptionsSchemaType = {
    body: values.body,
    build_date: values.buildDate,
    doors: values.doors,
    engine_size: values.engineSize,
    fuel: values.fuel,
    make: values.make,
    model: values.model,
    model_year: values.modelYear,
    trim: values.trim,
    version: values.trim,
  };

  const { data } = await supabaseClient.auth.getSession();
  const response = await postClient(
    "/api/cars/create-cars-info",
    carOptions,
    data.session?.access_token as string
  );

  return response;
}

export function CreateForm({ setIsNewCar }: ItemProps) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    error,
    isSuccess,
    mutate: createCarInformationMutation,
  } = useMutation({
    mutationFn: createCarInformation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const initialValues: FormikCarOptionsSchemaType = {
    body: "",
    buildDate: "",
    doors: 0,
    engineSize: 0,
    fuel: "",
    make: "",
    model: "",
    modelYear: 2023,
    trim: "",
    version: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createCarValidationSchema,
    onSubmit: async (values) => {
      createCarInformationMutation(values);
    },
  });

  useEffect(() => {
    if (data && isSuccess && !error) {
      formik.setFieldValue("body", "");
      formik.setFieldValue("buildDate", "");
      formik.setFieldValue("doors", 0);
      formik.setFieldValue("engineSize", 0);
      formik.setFieldValue("fuel", "");
      formik.setFieldValue("make", "");
      formik.setFieldValue("model", "");
      formik.setFieldValue("modelYear", 2023);
      formik.setFieldValue("trim", "");
      formik.setFieldValue("version", "");
      setIsNewCar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, error]);

  return (
    <form method="POST" onSubmit={formik.handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Vehicle options details
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use the form below to provide all necessary information of the
          vehicle.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="make-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Vehicle make
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...formik.getFieldProps("make")}
                id="make-name"
                autoComplete="make-name"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.make && formik.touched.make ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.make}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="model-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Model name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...formik.getFieldProps("model")}
                id="model-name"
                autoComplete="model-name"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.model && formik.touched.model ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.model}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="fuel"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fuel
            </label>
            <div className="mt-2">
              <input
                id="fuel"
                {...formik.getFieldProps("fuel")}
                type="text"
                autoComplete="fuel"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.fuel && formik.touched.fuel ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.fuel}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="model-year"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Model year
            </label>
            <div className="mt-2">
              <select
                id="model-year"
                {...formik.getFieldProps("modelYear")}
                autoComplete="model-year"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
              </select>
              {formik.errors.modelYear && formik.touched.modelYear ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.modelYear}
                </small>
              ) : null}
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="body"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Body
            </label>
            <div className="mt-2">
              <textarea
                id="body"
                autoComplete="body"
                {...formik.getFieldProps("body")}
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              ></textarea>
              {formik.errors.body && formik.touched.body ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.body}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="engineSize"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Engine size
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...formik.getFieldProps("engineSize")}
                id="engine-size"
                autoComplete="engine-size"
                className="block w-full rounded-md px-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.engineSize && formik.touched.engineSize ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.engineSize}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="doors"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Doors
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...formik.getFieldProps("doors")}
                id="doors"
                autoComplete="doors"
                className="block w-full rounded-md px-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.doors && formik.touched.doors ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.doors}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="buildDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Build date
            </label>
            <div className="mt-2">
              <input
                type="date"
                {...formik.getFieldProps("buildDate")}
                id="buildDate"
                autoComplete="buildDate"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.buildDate && formik.touched.buildDate ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.buildDate}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="trim"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Trim
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...formik.getFieldProps("trim")}
                id="trim"
                autoComplete="trim"
                className="block w-full rounded-md px-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.trim && formik.touched.trim ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.trim}
                </small>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="version"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Version
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...formik.getFieldProps("version")}
                id="version"
                autoComplete="version"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.version && formik.touched.version ? (
                <small className="text-red-500 font-normal">
                  {formik.errors.version}
                </small>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => setIsNewCar(false)}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          {isLoading ? <Loading /> : "Create Options"}
        </button>
      </div>
    </form>
  );
}
export default CreateForm;
