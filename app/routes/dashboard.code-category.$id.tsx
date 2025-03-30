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
import { CodeCategoryForm } from "~/components/code-category/code-category-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Edit Code Category" },
    { name: "description", content: "Edit Code Category" },
  ];
};

export const breadcrumbItems = [
  {
    title: "Code Categories",
    link: "/dashboard/code-categories?page=1&limit=5",
  },
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

    // 実際の実装では、サーバーからコードカテゴリ情報を取得するAPIを呼び出す
    // ここではモックデータを返す
    const categoryPromise = new Promise((resolve) => {
      setTimeout(() => {
        // ここでは簡易的なモックデータを返します
        const mockData = {
          categoryCode: id,
          categoryName:
            id === "GNR0001" ? "性別" : id === "GNR0002" ? "都道府県" : "有無",
          description: `${id}の説明`,
        };
        resolve(mockData);
      }, 500);
    });

    const tokenPromise: Promise<string> = new Promise((resolve) => {
      setTimeout(() => {
        resolve("dummy-csrf-token");
      }, 500);
    });

    return defer({
      categoryPromise,
      tokenPromise,
    });
  },
);

export default function EditCodeCategory() {
  const { categoryPromise, tokenPromise } =
    useLoaderData<typeof clientLoader>();

  return (
    <>
      <Helmet>
        <title>DashBoard - Edit Code Category</title>
      </Helmet>
      <Shell variant="sidebar">
        <BreadCrumb items={breadcrumbItems} />
        <div className="space-y-4 py-4 sm:space-y-6 lg:space-y-8">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <Await resolve={Promise.all([categoryPromise, tokenPromise])}>
              {([category, token]) => (
                <CodeCategoryForm initialData={category} csrfToken={token} />
              )}
            </Await>
          </Suspense>
        </div>
      </Shell>
    </>
  );
}
