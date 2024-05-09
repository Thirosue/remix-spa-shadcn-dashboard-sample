import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import { getData } from "~/lib/fetch";
import { useLoaderData } from "@remix-run/react";

const captains = console;

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Product" },
    { name: "description", content: "DashBoard Product" },
  ];
};

// function that will execute on the client.
export async function clientLoader() {
  // During client-side navigations, we hit our exposed API endpoints directly
  const data = await getData("/api/products?page=0&rows=5");
  return data;
}

export default function Product() {
  const { count, data } = useLoaderData<typeof clientLoader>();
  captains.log("Product Page Result size: ", count, data);
  return <Shell className="max-w-lg">Product Page Result size: {count}</Shell>;
}
