import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInModal } from "@/components/Auth/SignInModal";
import { SignUpModal } from "@/components/Auth/SignUpModal";

interface AuthButtonsProps {
  mobile?: boolean;
}

export function AuthButtons({ mobile = false }: AuthButtonsProps) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSwitchToSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  if (mobile) {
    return (
      <>
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => setIsSignInOpen(true)}
        >
          Sign in
        </Button>
        <Button
          variant="hero"
          className="w-full justify-center"
          onClick={() => setIsSignUpOpen(true)}
        >
          Get Started — Free
        </Button>

        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
          onSwitchToSignUp={handleSwitchToSignUp}
        />
        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setIsSignInOpen(true)}>
        Sign in
      </Button>
      <Button variant="hero" onClick={() => setIsSignUpOpen(true)}>
        Get Started — Free
      </Button>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
}
