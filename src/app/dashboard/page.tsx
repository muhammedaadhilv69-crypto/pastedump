import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";

import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-emerald-700">Your workspace</p>
          <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Create a paste or jump back to the links you have shared.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <Plus aria-hidden="true" className="size-5" />
              </div>
              <CardTitle className="text-lg">Create a new paste</CardTitle>
              <CardDescription>
                Share code, notes, logs, or any text with a simple link.
              </CardDescription>
            </CardHeader>
            <CardFooter className="border-t">
              <Button
                render={<Link href="/pastes/new" />}
                nativeButton={false}
                className="gap-2"
              >
                Create paste
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                <FileText aria-hidden="true" className="size-5" />
              </div>
              <CardTitle className="text-lg">My pastes</CardTitle>
              <CardDescription>
                Find and manage the pastes you have created.
              </CardDescription>
            </CardHeader>
            <CardFooter className="border-t">
              <Button
                variant="outline"
                render={<Link href="/dashboard/mine" />}
                nativeButton={false}
                className="gap-2"
              >
                View my pastes
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
