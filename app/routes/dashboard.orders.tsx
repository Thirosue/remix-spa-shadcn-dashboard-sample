import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Order" },
    { name: "description", content: "Order Home" },
  ];
};

export default function Order() {
  return (
    <>
      <Helmet>
        <title>DashBoard - Order</title>
      </Helmet>
      <Shell className="max-w-lg">DashBoard Order</Shell>
    </>
  );
}
