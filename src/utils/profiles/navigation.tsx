interface INavType {
  name: string;
  href: string;
}

interface IProfileNavType extends INavType {
  id: number;
}

interface IMainNavType extends INavType {
  current: boolean;
}

export const navigation: IMainNavType[] = [
  {
    name: "Home",
    href: "#",
    current: true,
  },
  {
    name: "Profile",
    href: "#",
    current: false,
  },
  {
    name: "Invoice Requests",
    href: "#",
    current: false,
  },
  {
    name: "Orders",
    href: "#",
    current: false,
  },
  {
    name: "Car Stores",
    href: "#",
    current: false,
  },
  {
    name: "Settings",
    href: "#",
    current: false,
  },
];
export const userNavigation: IProfileNavType[] = [
  { name: "Your Profile", href: "#", id: 1 },
  { name: "Settings", href: "#", id: 2 },
  { name: "Sign out", href: "#", id: 3 },
];
