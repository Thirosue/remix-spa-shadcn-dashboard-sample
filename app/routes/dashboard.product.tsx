import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { getData } from "~/lib/fetch";
import {
  useLoaderData,
  Await,
  defer,
  useNavigation,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import BreadCrumb from "~/components/breadcrumb";
import { ProductSearchFormValues } from "~/types";
import {
  PageableTable,
  parseSortQueryParam,
} from "~/components/ui/pageable-table";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { columns } from "~/components/product/columns";
import { ProductTableHeader } from "~/components/product/product-table-header";
import { ProductSearchForm } from "~/components/product/product-search-form";

const captains = console;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Product" },
    { name: "description", content: "DashBoard Product" },
  ];
};

export const breadcrumbItems = [
  { title: "Product", link: "/dashboard/product" },
];

// function that will execute on the client.
export function clientLoader({ request }: ClientLoaderFunctionArgs) {
  // During client-side navigations, we hit our exposed API endpoints directly
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1") - 1;

  captains.log("clientLoader start", new Date().toISOString());
  const loaderPromise = getData(`/api/products?page=${page}&rows=5`);
  return defer({ loaderPromise });
}

export default function Product() {
  const { loaderPromise } = useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const searchParams: ProductSearchFormValues = {
    page: 0,
    limit: 5,
    sort: "name,asc",
  };

  return (
    <Shell variant="sidebar">
      <BreadCrumb items={breadcrumbItems} />
      <Suspense
        fallback={
          <Skeleton className="h-[calc(75vh-220px)] rounded-md border" />
        }
      >
        <>
          {/* here is where Remix awaits the promise */}
          <Await resolve={loaderPromise}>
            {/* now you have the resolved value */}
            {({ count, data }) => (
              <>
                <ProductTableHeader isPending={isPending} totalCount={count} />
                <Separator />
                <ProductSearchForm searchParams={searchParams} />
                <Separator />
                {isPending ? (
                  <Skeleton className="h-[calc(55vh-220px)] rounded-md border" />
                ) : (
                  <PageableTable
                    pageNo={searchParams.page!}
                    columns={columns}
                    totalCount={count}
                    data={data}
                    initailSort={parseSortQueryParam(searchParams.sort)}
                    pageCount={Math.ceil(count / searchParams.limit!)}
                  />
                )}
              </>
            )}
          </Await>
        </>
      </Suspense>
    </Shell>
  );
}
