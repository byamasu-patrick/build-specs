import { classNames } from "@/utils/common";
import { navigation } from "@/utils/profiles/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchMobile from "../search/search-mobile";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type MainNavigationProps = {
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
};

export function MainNavigation({
  currentTab,
  setCurrentTab,
}: MainNavigationProps) {
  return (
    <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
      <div className="grid grid-cols-3 items-center gap-8">
        <div className="col-span-2">
          <nav className="flex space-x-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => setCurrentTab(item.id)}
                className={classNames(
                  item.id === currentTab ? "text-white" : "text-indigo-100",
                  "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <SearchMobile />
        </div>
      </div>
    </div>
  );
}
