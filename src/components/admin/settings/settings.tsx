import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ServerIcon,
  SignalIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

export function Settings() {
  const navigation = [
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Deployments", href: "#", icon: ServerIcon, current: false },
    { name: "Activity", href: "#", icon: SignalIcon, current: false },
    { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
    { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
    { name: "Settings", href: "#", icon: Cog6ToothIcon, current: true },
  ];
  const teams = [
    { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
    { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
    { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  ];
  const secondaryNavigation = [
    { name: "Account", href: "#", current: true },
    { name: "Notifications", href: "#", current: false },
    { name: "Billing", href: "#", current: false },
    { name: "Teams", href: "#", current: false },
    { name: "Integrations", href: "#", current: false },
  ];
  return (
    <>
      <div className="mb-8 rounded-lg  bg-white shadow">
        {/* Sticky search header */}
        <div className="flex flex-col shrink-0 items-center gap-x-6 border-b px-4 shadow-sm sm:px-6 lg:px-8">
          {/* Settings forms */}
          {/* <div className="divide-y"> */}
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <Image
                    src="https://res.cloudinary.com/dcszwfxwj/image/upload/v1688726908/icons8-person-96_1_lqo4dx.png"
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg border-2 bg-white object-cover"
                    height={97}
                    width={97}
                  />
                  <div>
                    <button
                      type="button"
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white/20"
                    >
                      Change avatar
                    </button>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md  ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-500">
                      <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                        example.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Timezone
                  </label>
                  <div className="mt-2">
                    <select
                      id="timezone"
                      name="timezone"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option>Pacific Standard Time</option>
                      <option>Eastern Standard Time</option>
                      <option>Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      id="current-password"
                      name="current_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
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
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
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
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Log out other sessions
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Please enter your password to confirm you would like to log out
                of your other sessions across all of your devices.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="logout-password"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Your password
                  </label>
                  <div className="mt-2">
                    <input
                      id="logout-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0  py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Log out other sessions
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                Yes, delete my account
              </button>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
export default Settings;
