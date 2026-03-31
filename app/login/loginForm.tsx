"use client";

import { authenticate } from "@/app/lib/actions";
import { Button, Field, Input, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg bg-gray-700 p-8 min-w-80"
    >
      <div className="flex flex-col gap-4">
        <Field className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </Field>
        <Field className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
          />
        </Field>
      </div>
      <Input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button
        type="submit"
        className="flex items-center justify-center gap-2"
        aria-disabled={isPending}
      >
        Log in <ArrowRightIcon className="size-4" />
      </Button>
      <div
        className="flex gap-2 h-4 items-end"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
