import { redirect } from "@remix-run/react";

export async function clientLoader() {
  return redirect(`/auth/signin`);
}

export default function DashboardIndex() {
  return <></>;
}
