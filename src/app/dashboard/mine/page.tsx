import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function MyPastesPage() {
  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-emerald-700">Your workspace</p>
          <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            My Pastes
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Your saved pastes will show up here.
          </p>
        </div>

        <Empty className="min-h-[20rem] border border-dashed bg-background">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>No pastes yet</EmptyTitle>
            <EmptyDescription>
              Create a paste to start keeping your shared snippets together.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              render={<Link href="/pastes/new" />}
              nativeButton={false}
              className="gap-2"
            >
              <Plus data-icon="inline-start" />
              Create a paste
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
}
