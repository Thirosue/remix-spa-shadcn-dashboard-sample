import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { useLoaderData, Await, defer } from "@remix-run/react";
import BreadCrumb from "~/components/breadcrumb";
import { Skeleton } from "~/components/ui/skeleton";
import { CodeCategoryForm } from "~/components/code-category/code-category-form";
import { logMessage } from "~/lib/logger";
import * as HelmetAsync from "react-helmet-async";
import { withAuthLoader } from "./dashboard";
const { Helmet } = HelmetAsync;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - New Code Category" },
    { name: "description", content: "Create New Code Category" },
  ];
};

export const breadcrumbItems = [
  {
    title: "Code Categories",
    link: "/dashboard/code-categories?page=1&limit=5",
  },
  { title: "New", link: "" },
];

// function that will execute on the client.
export const clientLoader = withAuthLoader(async () => {
  logMessage({ message: `clientLoader start at, ${new Date().toISOString()}` });

  const tokenPromise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve("dummy-csrf-token");
    }, 500);
  });

  return defer({
    tokenPromise,
  });
});

export default function NewCodeCategory() {
  const { tokenPromise } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Helmet>
        <title>DashBoard - New Code Category</title>
      </Helmet>
      <Shell variant="sidebar">
        <BreadCrumb items={breadcrumbItems} />
        <div className="space-y-4 py-4 sm:space-y-6 lg:space-y-8">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <Await resolve={tokenPromise}>
              {(token) => (
                <CodeCategoryForm initialData={null} csrfToken={token} />
              )}
            </Await>
          </Suspense>
        </div>
      </Shell>
    </>
  );
}
