import { redirect } from "@remix-run/react";

export async function clientLoader() {
  return redirect(`/dashboard/home`);
}

export default function DashboardIndex() {
  return <></>;
}
