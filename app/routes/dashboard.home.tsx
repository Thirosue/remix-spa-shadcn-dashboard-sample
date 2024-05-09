import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Home" },
    { name: "description", content: "DashBoard Home" },
  ];
};

export default function Home() {
  return <Shell className="max-w-lg">DashBoard Home</Shell>;
}
