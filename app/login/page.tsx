import { Suspense } from "react";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
