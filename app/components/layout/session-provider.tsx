import React, { createContext, useContext, useState, useEffect } from "react";
import { postData, deleteData } from "~/lib/fetch";
import { logMessage } from "~/lib/logger";
import { useMenu } from "./menu-provider";

type SessionState = {
  name: string;
  email: string;
  image: string;
  token: string;
  refreshToken?: string;
} | null;

type SessionValue = {
  session: SessionState;
  updateSession: (value: SessionState) => void;
  clearSession: () => void;
};

const defaultSessionValue = {
  session: null,
  updateSession: (value: SessionState) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  clearSession: () => {},
};

const SessionContext = createContext(defaultSessionValue as SessionValue);

export const callRefreshTokenEndpoint = async (): Promise<{
  status: "ok" | "error";
  token?: string;
  refreshToken?: string;
}> => {
  // TODO: 本番環境では不要。この実装はPOC用です。
  //       本番環境では、同一ドメインに認証APIを用意し、リフレッシュトークンはHttpOnlyクッキーに保存してください。
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    return { status: "error" };
  }

  try {
    // リフレッシュトークンを使ってアクセストークンを再発行します。
    // サーバー側でリフレッシュトークンの有効期限も延長されます。
    const { status, token } = await postData(
      "/api/auth/refreshTokenCheck",
      {},
      { "X-Refresh-Token": refreshToken },
    );

    return { status, token, refreshToken };
  } catch (error) {
    logMessage({ message: "Failed to refresh token", object: error });
    // TODO: 本番環境では不要。この実装はPOC用です。
    //       本番環境では、同一ドメインに認証APIを用意し、リフレッシュトークンはHttpOnlyクッキーに保存してください。
    sessionStorage.removeItem("refreshToken");
    return { status: "error" };
  }
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [session, setSession] = useState<SessionState>(null);
  const { updateNaviItems } = useMenu();

  const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      logMessage({ message: "Failed to decode token", object: error });
      return null;
    }
  };

  // 画面リフレッシュ対応: 初回レンダリング時にセッションを復元
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      try {
        const { status, token } = await callRefreshTokenEndpoint();
        if (status === "ok" && token) {
          const payload = decodeToken(token);
          setSession({
            name: "John Doe", // dummy data
            email: payload.email,
            image: "https://avatars.githubusercontent.com/u/14899056?v=4", // dummy data
            token,
          });
          updateNaviItems(token);
          logMessage({ message: "Refreshed token", object: { token } });
        }
      } catch (error) {
        logMessage({ message: "Failed to refresh token", object: error });
        setSession(null);
      }
    };

    logMessage({ message: "SessionProvider mounted" });
    checkAndRefreshToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearSession = async () => {
    try {
      await deleteData("/api/auth/signout");
    } finally {
      setSession(null);
      // TODO: 本番環境では不要。この実装はPOC用です。
      //       本番環境では、同一ドメインに認証APIを用意し、リフレッシュトークンはHttpOnlyクッキーに保存してください。
      sessionStorage.removeItem("refreshToken");
    }
  };

  const updateSession = (value: SessionState) => {
    if (value) {
      const newSession = { ...session, ...value };
      setSession(newSession);
      // TODO: 本番環境では不要。この実装はPOC用です。
      //       本番環境では、同一ドメインに認証APIを用意し、リフレッシュトークンはHttpOnlyクッキーに保存してください。
      sessionStorage.setItem("refreshToken", newSession.refreshToken!);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        updateSession,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// カスタムフックを作成してコンテキストにアクセスできるようにする
export const useSession = () => useContext(SessionContext);
