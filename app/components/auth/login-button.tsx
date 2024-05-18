import { useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";

export function LogInButton() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/auth/signin");
  };

  return (
    <Button
      aria-label="Log out"
      size="sm"
      className="w-full"
      onClick={handleLogIn}
    >
      Log In
    </Button>
  );
}
