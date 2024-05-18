import React, { createContext, useContext, useState, useEffect } from "react";
import { postData, deleteData } from "~/lib/fetch";

const captains = console;

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
  updateSession: (value: SessionState) => {},
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

    return { status, token };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return { status: "error" };
  }
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [session, setSession] = useState<SessionState>(null);

  const decodeToken = (token: string): any => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

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
        captains.log("Refreshed token:", token);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      setSession(null);
    }
  };

  // 画面リフレッシュ対応: 初回レンダリング時にセッションを復元
  useEffect(() => {
    captains.log("SessionProvider mounted");
    checkAndRefreshToken();
  }, []);

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

export default SessionProvider;
