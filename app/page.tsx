import { LoginForm } from "./ui/login-form";
import { ModeToggle } from "./components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b border-border/40 px-6 lg:px-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center transform rotate-3">
            <div className="h-4 w-4 bg-white rounded-sm" />
          </div>
          News Desk Admin
        </div>
        <ModeToggle />
      </header>
      <main className="flex grow flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background">
        <div className="w-full max-w-120 rounded-xl border bg-card text-card-foreground shadow-2xl p-8 pt-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} News Office Management System. Internal Use Only.
      </footer>
    </div>
  );
}
