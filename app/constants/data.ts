import { NavItem } from "~/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/home",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Product",
    href: "/dashboard/product",
    icon: "barcode",
    label: "product",
  },
  {
    title: "SignOut",
    href: "/signout",
    icon: "logout",
    label: "signout",
    alwaysShow: true,
  },
];

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
};
