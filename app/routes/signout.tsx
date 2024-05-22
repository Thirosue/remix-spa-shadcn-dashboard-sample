import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { LogOutButtons } from "~/components/auth/logout-buttons";
import * as HelmetAsync from "react-helmet-async"; // デフォルトエクスポートとしてインポート
const { Helmet } = HelmetAsync; // 必要なコンポーネントを取得

export default function SignOutPage() {
  return (
    <>
      <Helmet>
        <title>Sign Out</title>
      </Helmet>
      <Shell className="max-w-xs">
        <PageHeader
          id="sign-out-page-header"
          aria-labelledby="sign-out-page-header-heading"
          className="text-center"
        >
          <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Are you sure you want to sign out?
          </PageHeaderDescription>
        </PageHeader>
        <LogOutButtons />
      </Shell>
    </>
  );
}
