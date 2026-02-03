import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const session = await decrypt(sessionToken);

  if (session?.accessToken) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6 text-center">
      <div className="flex items-center gap-3 mb-8 font-bold text-3xl">
        <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center transform rotate-3 shadow-lg">
          <div className="h-6 w-6 bg-white rounded-sm" />
        </div>
        NewsOffice Pro
      </div>

      <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 max-w-2xl">
        Manage your newsroom with <span className="text-primary bg-clip-text bg-linear-to-r from-primary to-blue-600">Precision.</span>
      </h1>

      <p className="text-muted-foreground text-lg mb-10 max-w-xl">
        The all-in-one platform for news story assignment, team collaboration, and content permissions.
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <Button size="lg" className="h-12 px-8 text-base">
            Admin Access
          </Button>
        </Link>
      </div>

      <p className="mt-20 text-xs text-muted-foreground tracking-widest uppercase opacity-50">
        Enterprise-Grade News Management System
      </p>
    </div>
  );
}
