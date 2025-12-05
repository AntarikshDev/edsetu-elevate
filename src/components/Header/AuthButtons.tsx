import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  mobile?: boolean;
}

export function AuthButtons({ mobile = false }: AuthButtonsProps) {
  if (mobile) {
    return (
      <>
        <Button
          variant="ghost"
          className="w-full justify-center"
          asChild
        >
          <Link to="/auth">Sign in</Link>
        </Button>
        <Button
          variant="hero"
          className="w-full justify-center"
          asChild
        >
          <Link to="/auth?signup=true">Get Started — Free</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/auth">Sign in</Link>
      </Button>
      <Button variant="hero" asChild>
        <Link to="/auth?signup=true">Get Started — Free</Link>
      </Button>
    </>
  );
}
