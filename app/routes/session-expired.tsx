import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { LogInButton } from "~/components/auth/login-button";

export default function SessionExpiredPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="session-expired-page-header"
        aria-labelledby="session-expired-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Session Expired</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Your session has expired. Please log in again to continue.
        </PageHeaderDescription>
      </PageHeader>
      <LogInButton />
    </Shell>
  );
}
