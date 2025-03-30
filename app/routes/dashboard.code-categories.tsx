import { Suspense, createContext, useContext } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
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
import { CodeSearchFormValues } from "~/types";
import {
  PageableTable,
  parseSortQueryParam,
} from "~/components/ui/pageable-table";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { columns } from "~/components/code-category/columns";
import { CodeCategoryTableHeader } from "~/components/code-category/code-category-table-header";
import { CodeCategorySearchForm } from "~/components/code-category/code-category-search-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

const CsrfTokenContext = createContext("");

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Code Categories" },
    { name: "description", content: "System Code Categories Management" },
  ];
};

export const breadcrumbItems = [
  { title: "Code Categories", link: "/dashboard/code-categories" },
];

const parseUrl = (url: URL) => {
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "5");
  const categoryName = url.searchParams.get("categoryName");
  const sort = url.searchParams.get("sort");

  return { page, limit, categoryName, sort };
};

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const body = await request.formData();
  const url = new URL(request.url);
  const { limit } = parseUrl(url);
  const categoryName = body.get("categoryName");

  const params = new URLSearchParams({
    page: "1",
    limit: limit.toString(),
  });
  if (categoryName) {
    params.append("categoryName", categoryName.toString());
  }

  return redirect(`/dashboard/code-categories?${params.toString()}`);
}

// function that will execute on the client.
export const clientLoader = withAuthLoader(
  async ({ request }: ClientLoaderFunctionArgs) => {
    // During client-side navigations, we hit our exposed API endpoints directly
    const url = new URL(request.url);
    const { page, limit, categoryName, sort } = parseUrl(url);

    logMessage({
      message: `clientLoader start at, ${new Date().toISOString()}`,
    });

    const params = new URLSearchParams({
      page: (page - 1).toString(),
      rows: limit.toString(),
    });
    if (categoryName) {
      params.append("categoryName", categoryName);
    }
    if (sort) {
      const { id, desc } = parseSortQueryParam(sort)[0];
      params.append("orderBy", id);
      params.append("order", desc ? "desc" : "asc");
    }

    // 実際の実装では、サーバーからコードカテゴリを取得するAPIを呼び出す
    // ここではモックデータを返す
    const loaderPromise = new Promise((resolve) => {
      setTimeout(() => {
        // ここでは簡易的なモックデータを返します
        const mockData = {
          count: 3,
          data: [
            {
              categoryCode: "GNR0001",
              categoryName: "性別",
              description: "性別コード",
            },
            {
              categoryCode: "GNR0002",
              categoryName: "都道府県",
              description: "都道府県コード",
            },
            {
              categoryCode: "GNR0003",
              categoryName: "有無",
              description: "有無コード",
            },
          ],
        };
        resolve(mockData);
      }, 500);
    });

    const tokenPromise: Promise<string> = new Promise((resolve) => {
      setTimeout(() => {
        resolve("dummy-csrf-token");
      }, 1000);
    });

    return defer({
      loaderPromise: Promise.all([loaderPromise, tokenPromise]),
      page,
      limit,
      categoryName: categoryName ?? "",
      sort: sort ?? "",
    });
  },
);

export default function CodeCategories() {
  const { loaderPromise, categoryName, page, limit, sort } =
    useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const searchParams: CodeSearchFormValues = {
    categoryName,
    page,
    limit,
    sort,
  };

  return (
    <>
      <Helmet>
        <title>DashBoard - Code Categories</title>
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
                    <CodeCategoryTableHeader
                      isPending={isPending}
                      totalCount={count}
                    />
                    <Separator />
                    <Form method="post">
                      <CodeCategorySearchForm searchParams={searchParams} />
                    </Form>
                    <Separator />
                    {isPending ? (
                      <Skeleton className="h-[calc(55vh-220px)] rounded-md border" />
                    ) : (
                      <PageableTable
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

export const useCodeCategoryCsrfContext = () => useContext(CsrfTokenContext);
