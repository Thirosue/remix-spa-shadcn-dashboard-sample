import { Outlet, Link } from "@remix-run/react";
import { siteConfig } from "~/config/site";
import { Icons } from "~/components/icons";

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        to="/"
        className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>{siteConfig.name}</span>
      </Link>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
