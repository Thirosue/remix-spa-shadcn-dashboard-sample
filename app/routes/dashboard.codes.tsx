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
import { columns } from "~/components/code/columns";
import { CodeTableHeader } from "~/components/code/code-table-header";
import { CodeSearchForm } from "~/components/code/code-search-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

const CsrfTokenContext = createContext("");

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Codes" },
    { name: "description", content: "System Codes Management" },
  ];
};

export const breadcrumbItems = [{ title: "Codes", link: "/dashboard/codes" }];

const parseUrl = (url: URL) => {
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "5");
  const categoryCode = url.searchParams.get("categoryCode");
  const sort = url.searchParams.get("sort");

  return { page, limit, categoryCode, sort };
};

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const body = await request.formData();
  const url = new URL(request.url);
  const { limit } = parseUrl(url);
  const categoryCode = body.get("categoryCode");

  const params = new URLSearchParams({
    page: "1",
    limit: limit.toString(),
  });
  if (categoryCode) {
    params.append("categoryCode", categoryCode.toString());
  }

  return redirect(`/dashboard/codes?${params.toString()}`);
}

// function that will execute on the client.
export const clientLoader = withAuthLoader(
  async ({ request }: ClientLoaderFunctionArgs) => {
    // During client-side navigations, we hit our exposed API endpoints directly
    const url = new URL(request.url);
    const { page, limit, categoryCode, sort } = parseUrl(url);

    logMessage({
      message: `clientLoader start at, ${new Date().toISOString()}`,
    });

    const params = new URLSearchParams({
      page: (page - 1).toString(),
      rows: limit.toString(),
    });
    if (categoryCode) {
      params.append("categoryCode", categoryCode);
    }
    if (sort) {
      const { id, desc } = parseSortQueryParam(sort)[0];
      params.append("orderBy", id);
      params.append("order", desc ? "desc" : "asc");
    }

    // 実際の実装では、サーバーからコードを取得するAPIを呼び出す
    // ここではモックデータを返す
    const loaderPromise = new Promise((resolve) => {
      setTimeout(() => {
        // ここでは簡易的なモックデータを返します
        const mockData = {
          count: 3,
          data: [
            {
              id: "1",
              categoryCode: "GNR0001",
              codeValue: "01",
              codeName: "男",
              codeAlias: "male",
              displayOrder: 1,
            },
            {
              id: "2",
              categoryCode: "GNR0001",
              codeValue: "02",
              codeName: "女",
              codeAlias: "female",
              displayOrder: 2,
            },
            {
              id: "3",
              categoryCode: "GNR0003",
              codeValue: "01",
              codeName: "無",
              codeAlias: null,
              displayOrder: 1,
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
      categoryCode: categoryCode ?? "",
      sort: sort ?? "",
    });
  },
);

export default function Codes() {
  const { loaderPromise, categoryCode, page, limit, sort } =
    useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const searchParams: CodeSearchFormValues = {
    categoryCode,
    page,
    limit,
    sort,
  };

  return (
    <>
      <Helmet>
        <title>DashBoard - Codes</title>
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
                    <CodeTableHeader isPending={isPending} totalCount={count} />
                    <Separator />
                    <Form method="post">
                      <CodeSearchForm searchParams={searchParams} />
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

export const useCodeCsrfContext = () => useContext(CsrfTokenContext);
