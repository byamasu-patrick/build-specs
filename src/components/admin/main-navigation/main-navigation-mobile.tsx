import { navigation } from "@/utils/profiles/navigation";
import Link from "next/link";

export function MainNavigationMobile() {
  return (
    <div className="mt-3 space-y-1 px-2">
      {navigation.map((item) => (
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
}

export default MainNavigationMobile;
