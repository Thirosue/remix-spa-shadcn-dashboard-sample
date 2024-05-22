import type { MetaFunction } from "@remix-run/node";
import { Shell } from "~/components/shell";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

export const meta: MetaFunction = () => {
  return [
    { title: "DashBoard - Home" },
    { name: "description", content: "DashBoard Home" },
  ];
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DashBoard - Home</title>
      </Helmet>
      <Shell className="max-w-lg">DashBoard Home</Shell>
    </>
  );
}
