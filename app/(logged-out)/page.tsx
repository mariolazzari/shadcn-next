import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

function LandingPage() {
  return (
    <>
      <h1 className="flex items-center gap-2">
        <PersonStandingIcon size={50} className="text-pink-500" /> Support Me
      </h1>
      <p>The best dashboard to manage customer support</p>

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <small>or</small>
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </>
  );
}

export default LandingPage;
