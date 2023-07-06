import { classNames } from "@/utils/common";
import { navigation } from "@/utils/profiles/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchMobile from "../search/search-mobile";

export function MainNavigation() {
  return (
    <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
      <div className="grid grid-cols-3 items-center gap-8">
        <div className="col-span-2">
          <nav className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? "text-white" : "text-indigo-100",
                  "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
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
