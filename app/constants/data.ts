import { NavItem } from "~/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/home",
    icon: "dashboard",
    label: "Dashboard",
    alwaysShow: true,
  },
  {
    title: "Product",
    href: "/dashboard/products?page=1&limit=5",
    icon: "barcode",
    label: "product",
  },
  {
    title: "Order",
    href: "/dashboard/orders?page=1&limit=5",
    icon: "order",
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
