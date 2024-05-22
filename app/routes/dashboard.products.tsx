import { Suspense, createContext, useContext } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { getData } from "~/lib/fetch";
import {
  Form,
  useLoaderData,
  Await,
  defer,
  useNavigation,
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  redirect,
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
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

const CsrfTokenContext = createContext("");

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Product" },
    { name: "description", content: "DashBoard Product" },
  ];
};

export const breadcrumbItems = [
  { title: "Product", link: "/dashboard/product" },
];

const parseUrl = (url: URL) => {
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "5");
  const name = url.searchParams.get("name");
  const sort = url.searchParams.get("sort");

  return { page, limit, name, sort };
};

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const body = await request.formData();
  const url = new URL(request.url);
  const { limit } = parseUrl(url);
  const name = body.get("name");

  const params = new URLSearchParams({
    page: "1",
    limit: limit.toString(),
  });
  if (name) {
    params.append("name", name.toString());
  }

  return redirect(`/dashboard/products?${params.toString()}`);
}

// function that will execute on the client.
export function clientLoader({ request }: ClientLoaderFunctionArgs) {
  // During client-side navigations, we hit our exposed API endpoints directly
  const url = new URL(request.url);
  const { page, limit, name, sort } = parseUrl(url);

  logMessage({ message: `clientLoader start at, ${new Date().toISOString()}` });

  const params = new URLSearchParams({
    page: (page - 1).toString(),
    rows: limit.toString(),
  });
  if (name) {
    params.append("name", name);
  }
  if (sort) {
    const { id, desc } = parseSortQueryParam(sort)[0];
    params.append("orderBy", id);
    params.append("order", desc ? "desc" : "asc");
  }

  const loaderPromise = getData(`/api/products?${params.toString()}`);
  const tokenPromise: Promise<string> = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("dummy-csrf-token");
    }, 1000);
  });

  return defer({
    loaderPromise: Promise.all([loaderPromise, tokenPromise]),
    page,
    limit,
    name: name ?? "",
    sort: sort ?? "",
  });
}

export default function Product() {
  const { loaderPromise, name, page, limit, sort } =
    useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const searchParams: ProductSearchFormValues = {
    name,
    page,
    limit,
    sort,
  };

  return (
    <>
      <Helmet>
        <title>DashBoard - Product</title>
      </Helmet>
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
              {([{ count, data }, token]) => (
                <>
                  <CsrfTokenContext.Provider value={token}>
                    <ProductTableHeader
                      isPending={isPending}
                      totalCount={count}
                    />
                    <Separator />
                    <Form method="post">
                      <ProductSearchForm searchParams={searchParams} />
                    </Form>
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
                  </CsrfTokenContext.Provider>
                </>
              )}
            </Await>
          </>
        </Suspense>
      </Shell>
    </>
  );
}

export const useProductCsrfContext = () => useContext(CsrfTokenContext);
