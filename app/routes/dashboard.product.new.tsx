import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import BreadCrumb from "~/components/breadcrumb";
import { ProductForm } from "~/components/product/product-form";

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Create Product" },
    { name: "description", content: "DashBoard Create Product" },
  ];
};

const breadcrumbItems = [
  { title: "Product", link: "/dashboard/products" },
  { title: "Create", link: "/dashboard/product/new" },
];

export default function ProductNew() {
  return (
    <Shell variant="sidebar">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm initialData={null} _csrf={"dummy-csrf-token"} />
    </Shell>
  );
}
