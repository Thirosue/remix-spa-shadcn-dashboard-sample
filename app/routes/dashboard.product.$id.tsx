import { Suspense } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { getData } from "~/lib/fetch";
import BreadCrumb from "~/components/breadcrumb";
import { ProductForm } from "~/components/product/product-form";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Skeleton } from "~/components/ui/skeleton";

const captains = console;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Update Product" },
    { name: "description", content: "DashBoard Update Product" },
  ];
};

// function that will execute on the client.
export function clientLoader({ params }: LoaderFunctionArgs) {
  // During client-side navigations, we hit our exposed API endpoints directly
  const id = params.id;
  captains.log("productId", id);

  const loaderPromise = getData(`/api/products/get?id=${id}`);
  const tokenPromise: Promise<string> = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("dummy-csrf-token");
    }, 1000);
  });

  return defer({
    id,
    loaderPromise: Promise.all([loaderPromise, tokenPromise]),
  });
}

export default function ProductUpdate() {
  const { loaderPromise, id } = useLoaderData<typeof clientLoader>();

  const breadcrumbItems = [
    { title: "Product", link: "/dashboard/products" },
    { title: "Update", link: `/dashboard/product/${id}` },
  ];

  return (
    <Shell variant="sidebar">
      <BreadCrumb items={breadcrumbItems} />
      <Suspense
        fallback={
          <Skeleton className="h-[calc(35vh-220px)] rounded-md border" />
        }
      >
        {/* here is where Remix awaits the promise */}
        <Await resolve={loaderPromise}>
          {/* now you have the resolved value */}
          {([data, token]) => <ProductForm initialData={data} _csrf={token} />}
        </Await>
      </Suspense>
    </Shell>
  );
}
