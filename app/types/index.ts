import { Icons } from "~/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  alwaysShow?: boolean;
}

export type PageSearchFormValues = {
  page?: number;
  limit?: number;
  sort?: string;
};

export type ProductSearchFormValues = {
  name?: string;
} & PageSearchFormValues;
