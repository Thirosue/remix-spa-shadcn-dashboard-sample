import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import BreadCrumb from "~/components/breadcrumb";
import { ProductForm } from "~/components/product/product-form";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Skeleton } from "~/components/ui/skeleton";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

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

// function that will execute on the client.
export function clientLoader() {
  // During client-side navigations, we hit our exposed API endpoints directly
  const tokenPromise: Promise<string> = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("dummy-csrf-token");
    }, 1000);
  });

  return defer({
    tokenPromise,
  });
}

export default function ProductNew() {
  const { tokenPromise } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Helmet>
        <title>DashBoard - Create Product</title>
      </Helmet>
      <Shell variant="sidebar">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense
          fallback={
            <Skeleton className="h-[calc(35vh-220px)] rounded-md border" />
          }
        >
          {/* here is where Remix awaits the promise */}
          <Await resolve={tokenPromise}>
            {/* now you have the resolved value */}
            {(token) => <ProductForm initialData={null} _csrf={token} />}
          </Await>
        </Suspense>
      </Shell>
    </>
  );
}
