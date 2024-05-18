import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { HomeButtons } from "~/components/navigation/home-buttons";

export default function NotFoundPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="not-found-page-header"
        aria-labelledby="not-found-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Page Not Found</PageHeaderHeading>
        <PageHeaderDescription size="sm" className="w-full">
          Sorry, the page you are looking for does not exist.
        </PageHeaderDescription>
      </PageHeader>
      <HomeButtons />
    </Shell>
  );
}
