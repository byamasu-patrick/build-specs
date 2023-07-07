interface INavType {
  name: string;
  href: string;
}

interface IProfileNavType extends INavType {
  id: number;
}

interface IMainNavType extends INavType {
  current: boolean;
  id: number;
}

export const navigation: IMainNavType[] = [
  {
    name: "Home",
    href: "#",
    current: true,
    id: 1,
  },
  {
    name: "Profile",
    href: "#",
    current: false,
    id: 2,
  },
  {
    name: "Invoice Requests",
    href: "#",
    current: false,
    id: 3,
  },
  {
    name: "Orders",
    href: "#",
    current: false,
    id: 4,
  },
  {
    name: "Car Stores",
    href: "#",
    current: false,
    id: 5,
  },
  {
    name: "Settings",
    href: "#",
    current: false,
    id: 6,
  },
];
export const userNavigation: IProfileNavType[] = [
  { name: "Your Profile", href: "#", id: 1 },
  { name: "Settings", href: "#", id: 2 },
  { name: "Sign out", href: "#", id: 3 },
];
