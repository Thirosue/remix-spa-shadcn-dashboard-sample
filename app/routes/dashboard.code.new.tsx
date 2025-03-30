import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { useLoaderData, Await, defer } from "@remix-run/react";
import BreadCrumb from "~/components/breadcrumb";
import { Skeleton } from "~/components/ui/skeleton";
import { CodeForm } from "~/components/code/code-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - New Code" },
    { name: "description", content: "Create New Code" },
  ];
};

export const breadcrumbItems = [
  { title: "Codes", link: "/dashboard/codes?page=1&limit=5" },
  { title: "New", link: "" },
];

// function that will execute on the client.
export const clientLoader = withAuthLoader(async () => {
  logMessage({ message: `clientLoader start at, ${new Date().toISOString()}` });

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
    categoriesPromise,
    tokenPromise,
  });
});

export default function NewCode() {
  const { categoriesPromise, tokenPromise } =
    useLoaderData<typeof clientLoader>();

  return (
    <>
      <Helmet>
        <title>DashBoard - New Code</title>
      </Helmet>
      <Shell variant="sidebar">
        <BreadCrumb items={breadcrumbItems} />
        <div className="space-y-4 py-4 sm:space-y-6 lg:space-y-8">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <Await resolve={Promise.all([categoriesPromise, tokenPromise])}>
              {([categories, token]) => (
                <CodeForm
                  initialData={null}
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
