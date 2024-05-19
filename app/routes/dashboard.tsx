import { Outlet, ClientActionFunction, redirect } from "@remix-run/react";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import { callRefreshTokenEndpoint } from "~/components/layout/session-provider";
import { logMessage } from "~/lib/logger";

// 認証を必要とする共通のloader高階関数
// これは他のloader関数に認証チェックを追加するために使用されます。
export function withAuthLoader(
  loaderFn: ClientActionFunction,
): ClientActionFunction {
  return async (args) => {
    try {
      logMessage({
        message: `Checking authentication... at ${new Date().toISOString()}`,
      });

      // リフレッシュトークンエンドポイントを呼び出し、ステータスをチェック
      const { status } = await callRefreshTokenEndpoint();

      // 認証に失敗した場合、セッション切れのページにリダイレクト
      if (status !== "ok") {
        return redirect("/session-expired");
      }

      // 認証に成功した場合、元のloader関数を実行
      return loaderFn(args);
    } catch (error) {
      // エラーハンドリング: 認証チェック中にエラーが発生した場合、セッション切れのページにリダイレクト
      logMessage({ message: `Error during authentication check: ${error}` });
      return redirect("/session-expired");
    }
  };
}

// クライアント側で実行されるloader関数
// 認証チェックが必要なすべてのクライアント側ナビゲーションで使用されます。
export const clientLoader = withAuthLoader(async () => {
  // クライアント側のナビゲーション中に直接APIエンドポイントにアクセス
  return {};
});

// アプリケーションの主要なレイアウトコンポーネント
// すべての認証が必要なページで使用されます。
export default function App() {
  return (
    <>
      {/* ヘッダーコンポーネント */}
      <Header />
      <div className="flex h-screen">
        {/* サイドバーコンポーネント */}
        <Sidebar />
        {/* メインコンテンツエリア */}
        <main className="w-full pt-16">
          {/* 認証が必要なコンテンツを表示するためのアウトレット */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
