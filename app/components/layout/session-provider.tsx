import React, { createContext, useContext, useState } from "react";

type SessionState = {
  name: string;
  email: string;
  image: string;
  token: string;
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

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [session, setSession] = useState<SessionState>(null);

  const clearSession = () => {
    setSession(null);
  };

  const updateSession = (value: SessionState) => {
    if (value) {
      setSession((prevSession) => ({ ...prevSession, ...value }));
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
