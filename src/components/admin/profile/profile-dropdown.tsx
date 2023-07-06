import { user } from "@/pages/home";
import { classNames } from "@/utils/common";
import { userNavigation } from "@/utils/profiles/navigation";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

export function ProfileMenu({
  navType,
}: {
  navType: "profile-nav" | "main-nav";
}) {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) void router.push("/");
  };

  const ProfileUserNav = () => (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={user.imageUrl}
            alt=""
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }: { active: boolean }) => {
                if (item.id === userNavigation.length)
                  return (
                    <button
                      onClick={signOut}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm w-full text-left text-gray-700"
                      )}
                    >
                      {item.name}
                    </button>
                  );
                return (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );

  const MainUserNav = () => (
    <div className="mt-3 space-y-1 px-2">
      {userNavigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return navType === "main-nav" ? <MainUserNav /> : <ProfileUserNav />;
}
