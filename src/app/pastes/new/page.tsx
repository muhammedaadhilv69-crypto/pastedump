"use client";

import { useState } from "react";
import { FileText, LockKeyhole, Plus } from "lucide-react";

import { Editor, type EditorLanguage } from "@/components/shared/editor";
import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const visibilityItems = [
  { label: "Public", value: "public" },
  { label: "Unlisted", value: "unlisted" },
  { label: "Private", value: "private" },
];

const expirationItems = [
  { label: "Never", value: "never" },
  { label: "10 minutes", value: "10m" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1d" },
  { label: "1 week", value: "7d" },
  { label: "1 month", value: "30d" },
];

export default function NewPastePage() {
  const [wordWrap, setWordWrap] = useState(true);
  const [language, setLanguage] = useState<EditorLanguage>("typescript");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <Plus aria-hidden="true" className="size-5 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Create a new paste
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Share text, code, logs, or anything else.
          </p>
        </div>

        <form>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="paste-title" className="sr-only">
                Title (optional)
              </FieldLabel>
              <Input
                id="paste-title"
                name="title"
                placeholder="Title (optional) — e.g. Debugging a Next.js middleware issue"
                className="h-14 rounded-xl px-4 shadow-sm"
              />
            </Field>

            <input
              type="hidden"
              name="language"
              value={language === "text" ? "plaintext" : language}
              readOnly
            />
            <input
              type="hidden"
              name="content"
              value={content}
              readOnly
            />
            <Editor
              ariaLabel="Paste content"
              value={content}
              onChange={setContent}
              language={language}
              onLanguageChange={setLanguage}
              wordWrap={wordWrap}
              onWordWrapChange={setWordWrap}
              className="rounded-xl shadow-sm"
            />

          <Card className="gap-0 rounded-xl py-0 shadow-sm">
            <CardHeader className="sr-only">
              <CardTitle>Paste settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 px-4 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:px-5">
              <Field>
                <FieldLabel
                  htmlFor="paste-visibility"
                  className="text-xs font-semibold"
                >
                  Visibility
                </FieldLabel>
                <Select
                  name="visibility"
                  items={visibilityItems}
                  value={visibility}
                  onValueChange={(value) => {
                    if (value) setVisibility(value);
                  }}
                >
                  <SelectTrigger
                    id="paste-visibility"
                    aria-label="Visibility"
                    className="h-10 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="paste-expiration"
                  className="text-xs font-semibold"
                >
                  Expiration
                </FieldLabel>
                <Select
                  name="expiration"
                  items={expirationItems}
                  defaultValue="never"
                >
                  <SelectTrigger
                    id="paste-expiration"
                    aria-label="Expiration"
                    className="h-10 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="10m">10 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="1d">1 day</SelectItem>
                      <SelectItem value="7d">1 week</SelectItem>
                      <SelectItem value="30d">1 month</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Button
                type="button"
                size="lg"
                className="h-11 gap-2 sm:min-w-40"
              >
                Create paste
                <FileText data-icon="inline-end" />
              </Button>
            </CardContent>
            <CardFooter className="flex items-center gap-2 rounded-b-xl border-t bg-muted/30 px-4 py-3 text-xs leading-5 text-muted-foreground sm:px-5">
              <LockKeyhole
                aria-hidden="true"
                className="size-3.5 shrink-0 text-emerald-700"
              />
              {visibility === "public"
                ? "Anyone can view this paste"
                : visibility === "unlisted"
                  ? "Anyone with the link can view this paste"
                  : "Only you can view this paste"}
            </CardFooter>
          </Card>
          </FieldGroup>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Keep it simple. Share what you need, when you need it.
        </p>
      </main>
    </div>
  );
}
