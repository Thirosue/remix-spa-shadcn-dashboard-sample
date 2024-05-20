import React, { createContext, useContext, useState, useEffect } from "react";
import { getData } from "~/lib/fetch";
import { logMessage } from "~/lib/logger";
import { NavItem } from "~/types";
import { navItems } from "~/constants/data";

type Permission = {
  namespace: string;
  operation: "view" | "create" | "edit" | "delete";
};

const defaultSessionValue = {
  navItems: [] as NavItem[],
  updateNaviItems: async (token: string) => {},
};

const MenuContext = createContext(defaultSessionValue);

export const fetchPermissions = async (
  token: string,
): Promise<{
  status: "ok" | "error";
  navItems?: NavItem[];
  permissions?: Permission[];
}> => {
  try {
    // トークンを使って認可情報を取得します。
    const { status, permissions } = await getData("/api/auth/permissions", {
      Authorization: `Bearer ${token}`,
    });

    if (status === "ok" && permissions) {
      const filteredNavItems = navItems.filter((item) => {
        if (item.alwaysShow) {
          return true;
        }
        // パーミッションに含まれる名前空間がタイトルに含まれているかどうかをチェックします。
        return permissions.some((permission: Permission) =>
          item.title.toLowerCase().includes(permission.namespace.toLowerCase()),
        );
      });
      return { status: "ok", navItems: filteredNavItems, permissions };
    }

    return { status: "error" };
  } catch (error) {
    logMessage({ message: "Failed to refresh token", object: error });
    // TODO: 本番環境では不要。この実装はPOC用です。
    //       本番環境では、同一ドメインに認証APIを用意し、リフレッシュトークンはHttpOnlyクッキーに保存してください。
    sessionStorage.removeItem("refreshToken");
    return { status: "error" };
  }
};

export const MenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  return (
    <MenuContext.Provider
      value={{
        navItems,
        updateNaviItems: async (token: string) => {
          const { navItems, status } = await fetchPermissions(token);
          if (status === "ok") {
            setNavItems(navItems!);
          }
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// カスタムフックを作成してコンテキストにアクセスできるようにする
export const useMenu = () => useContext(MenuContext);

export default MenuProvider;
