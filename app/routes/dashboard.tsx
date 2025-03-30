import { Outlet, redirect, ClientLoaderFunctionArgs } from "@remix-run/react";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import { callRefreshTokenEndpoint } from "~/components/layout/session-provider";
import { fetchPermissions } from "~/components/layout/menu-provider";
import { logMessage } from "~/lib/logger";
import { NavItem } from "~/types";

// Type definitions for route validation
type RouteValidationResult = {
  isValid: boolean;
  reason?: string;
};

type Permission = {
  namespace: string;
  operation: "view" | "create" | "edit" | "delete";
};

// Helper functions for path validation
const isPathAllowed = (
  pathname: string,
  navItems: NavItem[],
  permissions: Permission[],
): RouteValidationResult => {
  // Check if path is related to alwaysShow nav items (including all subpaths)
  const alwaysShowItems = navItems.filter((item) => item.alwaysShow);

  // Check each alwaysShow item if the path matches any of their namespaces
  for (const item of alwaysShowItems) {
    // Extract the namespace from href (e.g., "/dashboard/codes" -> "codes")
    if (item.href) {
      const pathParts = item.href.split("/");
      const namespace = pathParts[pathParts.length - 1]?.split("?")[0];

      // Check for singular/plural versions of the namespace
      // For example, if namespace is "codes", also check for "code"
      const singularNamespace = namespace?.endsWith("s")
        ? namespace.slice(0, -1)
        : namespace;
      const pluralNamespace =
        namespace && !namespace.endsWith("s") ? namespace + "s" : namespace;

      // If namespace (or its singular/plural form) is found in path, allow access
      if (
        (namespace && pathname.includes(`/${namespace}`)) ||
        (singularNamespace && pathname.includes(`/${singularNamespace}`)) ||
        (pluralNamespace && pathname.includes(`/${pluralNamespace}`))
      ) {
        return {
          isValid: true,
          reason: `Access allowed by alwaysShow item: ${item.title}`,
        };
      }
    }

    // If label is present, also check it as a namespace (including singular/plural forms)
    if (item.label) {
      const singularLabel = item.label.endsWith("s")
        ? item.label.slice(0, -1)
        : item.label;
      const pluralLabel = !item.label.endsWith("s")
        ? item.label + "s"
        : item.label;

      if (
        pathname.includes(`/${item.label}`) ||
        pathname.includes(`/${singularLabel}`) ||
        pathname.includes(`/${pluralLabel}`)
      ) {
        return {
          isValid: true,
          reason: `Access allowed by alwaysShow label: ${item.label}`,
        };
      }
    }
  }

  // Check if path is in navigation items
  const isInNavItems = navItems.some((item) => {
    const itemPath = item.href?.split("?")[0] || "";
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  });

  if (isInNavItems) {
    return {
      isValid: true,
      reason: "Access allowed by navigation item",
    };
  }

  // Check if path is allowed by permissions
  const hasPermission = permissions.some((permission) =>
    pathname.toLowerCase().includes(permission.namespace.toLowerCase()),
  );

  if (hasPermission) {
    return {
      isValid: true,
      reason: "Access allowed by permission namespace",
    };
  }

  return {
    isValid: false,
    reason: "Path not allowed by navigation items or permissions",
  };
};

/**
 * Higher-order function to add authentication check to loader functions
 * @param loaderFn The original loader function to wrap with authentication
 * @returns A new loader function with authentication check
 */
export function withAuthLoader<T>(
  loaderFn: (args: ClientLoaderFunctionArgs) => Promise<T>,
) {
  return async (args: ClientLoaderFunctionArgs): Promise<T | Response> => {
    try {
      logMessage({
        message: `Checking authentication... at ${new Date().toISOString()}`,
      });

      // Call refresh token endpoint and check status
      const { status, token } = await callRefreshTokenEndpoint();

      // Redirect to session-expired if authentication fails
      if (status !== "ok" || !token) {
        return redirect("/session-expired");
      }

      // Fetch navigation items and permissions
      const {
        status: menuStatus,
        navItems,
        permissions,
      } = await fetchPermissions(token);

      // Redirect to not-found if menu fetch fails
      if (menuStatus !== "ok" || !navItems || !permissions) {
        return redirect("/not-found");
      }

      // Get the current path without query parameters
      const url = new URL(args.request.url);
      const pathname = url.pathname;

      // Validate the current path against allowed routes
      const validationResult = isPathAllowed(pathname, navItems, permissions);

      logMessage({
        message: `Access validation for path: ${pathname}`,
        object: {
          result: validationResult.isValid ? "allowed" : "denied",
          reason: validationResult.reason,
        },
      });

      // If path is not allowed, redirect to not-found
      if (!validationResult.isValid) {
        return redirect("/not-found");
      }

      // If authentication succeeds, run the original loader function
      return loaderFn(args);
    } catch (error) {
      // Error handling: redirect to session-expired if authentication check fails
      logMessage({
        message: `Error during authentication check: ${error}`,
        object: error,
      });
      return redirect("/session-expired");
    }
  };
}

// Client-side loader function with authentication check
export const clientLoader = withAuthLoader<Record<string, never>>(async () => {
  // Client-side API access during navigation
  return {};
});

// Main layout component for authenticated pages
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
