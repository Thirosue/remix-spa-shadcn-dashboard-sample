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

export type CodeSearchFormValues = {
  categoryCode?: string;
  categoryName?: string;
} & PageSearchFormValues;

export type CodeCategory = {
  categoryCode: string;
  categoryName: string;
  description?: string | null;
};

export type Code = {
  id: string;
  categoryCode: string;
  codeValue: string;
  codeName: string;
  codeAlias?: string | null;
  displayOrder: number;
};
