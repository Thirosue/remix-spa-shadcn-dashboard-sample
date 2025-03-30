import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import {
  useLoaderData,
  Await,
  defer,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import BreadCrumb from "~/components/breadcrumb";
import { Skeleton } from "~/components/ui/skeleton";
import { CodeForm } from "~/components/code/code-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Edit Code" },
    { name: "description", content: "Edit Code" },
  ];
};

export const breadcrumbItems = [
  { title: "Codes", link: "/dashboard/codes?page=1&limit=5" },
  { title: "Edit", link: "" },
];

// function that will execute on the client.
export const clientLoader = withAuthLoader(
  async ({ params }: ClientLoaderFunctionArgs) => {
    // During client-side navigations, we hit our exposed API endpoints directly
    const id = params.id || "";

    logMessage({
      message: `clientLoader start at, ${new Date().toISOString()}`,
    });

    // 実際の実装では、サーバーからコード情報を取得するAPIを呼び出す
    // ここではモックデータを返す
    const codePromise = new Promise((resolve) => {
      setTimeout(() => {
        // ここでは簡易的なモックデータを返します
        const mockData = {
          id: id,
          categoryCode: "GNR0001",
          codeValue: "01",
          codeName: "男",
          codeAlias: "male",
          displayOrder: 1,
        };
        resolve(mockData);
      }, 500);
    });

    const categoriesPromise = new Promise((resolve) => {
      setTimeout(() => {
        // ここでは簡易的なモックデータを返します
        const mockCategories = [
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
        ];
        resolve(mockCategories);
      }, 500);
    });

    const tokenPromise: Promise<string> = new Promise((resolve) => {
      setTimeout(() => {
        resolve("dummy-csrf-token");
      }, 500);
    });

    return defer({
      codePromise,
      categoriesPromise,
      tokenPromise,
    });
  },
);

export default function EditCode() {
  const { codePromise, categoriesPromise, tokenPromise } =
    useLoaderData<typeof clientLoader>();

  return (
    <>
      <Helmet>
        <title>DashBoard - Edit Code</title>
      </Helmet>
      <Shell variant="sidebar">
        <BreadCrumb items={breadcrumbItems} />
        <div className="space-y-4 py-4 sm:space-y-6 lg:space-y-8">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <Await
              resolve={Promise.all([
                codePromise,
                categoriesPromise,
                tokenPromise,
              ])}
            >
              {([code, categories, token]) => (
                <CodeForm
                  initialData={code}
                  csrfToken={token}
                  categories={categories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </Shell>
    </>
  );
}
