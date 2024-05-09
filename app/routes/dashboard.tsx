import { Outlet } from "@remix-run/react";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="w-full pt-16">
          <Outlet />
        </main>
      </div>
    </>
  );
}
