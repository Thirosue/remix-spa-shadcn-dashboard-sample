import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { useSession } from "~/components/layout/session-provider";
import { useNavigate } from "@remix-run/react";
import { useToast } from "~/components/ui/use-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  const { session, clearSession } = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {session && <h1>Welcome to {session.name}!</h1>}
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/guides/spa-mode"
            rel="noreferrer"
          >
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Button
        onClick={() => {
          clearSession();
          navigate("/auth/signin");
          toast({
            description: "Logged out successfully!",
          });
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
