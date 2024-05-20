import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Order" },
    { name: "description", content: "Order Home" },
  ];
};

export default function Order() {
  return <Shell className="max-w-lg">Order Home</Shell>;
}
