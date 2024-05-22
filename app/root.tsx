import { useState, useEffect } from "react";
import { Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { cn } from "~/lib/utils";

import { Providers } from "~/components/layout/providers";

import stylesheet from "./tailwind.css?url";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

// SVGローディングスピナーコンポーネント
import "./loader.css";
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading...</p>
  </div>
);

export function HydrateFallback() {
  return (
    <>
      <LoadingSpinner />
      <Scripts />
    </>
  );
}

export default function Component() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={stylesheet} />
      </Helmet>
      <div className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Providers>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </div>
    </>
  );
}
