"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  FileText,
  Globe2,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/shared/navbar";


const features = [
  {
    icon: ArrowUpRight,
    title: "One link. That's it.",
    description: "Share a snippet in seconds. No accounts or setup in the way.",
  },
  {
    icon: Code2,
    title: "Made for the details.",
    description: "Keep formatting readable with syntax highlighting for your code.",
  },
  {
    icon: Clock3,
    title: "Your paste, your rules.",
    description: "Choose how long a link sticks around, then let it expire.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar />

      <main>
        <section className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(167,243,208,0.28),transparent_68%)]"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 md:gap-10 md:pb-28 md:pt-24 lg:grid-cols-[1fr_0.92fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles
                  aria-hidden="true"
                  className="size-3.5 text-emerald-600"
                />
                A little space for the things you share
              </div>
              <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl">
                Paste it.
                <br />
                <span className="text-emerald-700">Link it.</span> Done.
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
                The simplest way to share code, notes, and tiny bits of the
                internet. Make a paste, send the link, get back to what you were
                doing.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/pastes/new"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition hover:-translate-y-0.5 hover:bg-primary/85"
                >
                  Create your first paste
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 text-emerald-600"
                  />
                  Free to use
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 text-emerald-600"
                  />
                  No fuss
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 text-emerald-600"
                  />
                  Ready when you are
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[32rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-5 -z-10 rounded-[2rem] bg-emerald-100/70 blur-2xl"
              />
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-zinc-900/15">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-amber-300" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 font-mono text-xs text-zinc-400">
                      hello-world.js
                    </span>
                  </div>
                  <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-400">
                    JAVASCRIPT
                  </span>
                </div>
                <div className="overflow-x-auto px-5 py-6 sm:px-7 sm:py-8">
                  <div className="min-w-[19rem] font-mono text-[13px] leading-7 sm:text-sm">
                    <div className="flex">
                      <span className="mr-6 w-4 shrink-0 select-none text-right text-zinc-600">
                        1
                      </span>
                      <span>
                        <span className="text-fuchsia-300">const</span>{" "}
                        <span className="text-sky-200">littleIdea</span>{" "}
                        <span className="text-zinc-400">=</span>{" "}
                        <span className="text-amber-200">{"{"}</span>
                      </span>
                    </div>
                    <div className="flex">
                      <span className="mr-6 w-4 shrink-0 select-none text-right text-zinc-600">
                        2
                      </span>
                      <span className="pl-5">
                        <span className="text-emerald-300">
                          &quot;say&quot;
                        </span>
                        <span className="text-zinc-400">:</span>{" "}
                        <span className="text-amber-200">
                          &quot;hey, this might help&quot;
                        </span>
                        <span className="text-zinc-400">,</span>
                      </span>
                    </div>
                    <div className="flex">
                      <span className="mr-6 w-4 shrink-0 select-none text-right text-zinc-600">
                        3
                      </span>
                      <span className="pl-5">
                        <span className="text-emerald-300">
                          &quot;share&quot;
                        </span>
                        <span className="text-zinc-400">:</span>{" "}
                        <span className="text-amber-200">
                          &quot;with a link&quot;
                        </span>
                      </span>
                    </div>
                    <div className="flex">
                      <span className="mr-6 w-4 shrink-0 select-none text-right text-zinc-600">
                        4
                      </span>
                      <span className="text-amber-200">{"}"}</span>
                    </div>
                    <div className="mt-4 flex">
                      <span className="mr-6 w-4 shrink-0 select-none text-right text-zinc-600">
                        5
                      </span>
                      <span className="text-zinc-500">
                        <span className="text-violet-300">console</span>
                        <span className="text-zinc-400">.</span>
                        <span className="text-sky-200">log</span>
                        <span className="text-zinc-400">(</span>
                        <span className="text-emerald-300">
                          &quot;link copied&quot;
                        </span>
                        <span className="text-zinc-400">)</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5">
                  <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                    <Globe2
                      aria-hidden="true"
                      className="size-3.5 text-emerald-300"
                    />
                    Anyone with the link
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                    <LockKeyhole aria-hidden="true" className="size-3" />
                    Your choice
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 flex w-[min(90%,22rem)] -translate-x-1/2 items-center gap-3 rounded-xl border bg-background p-3.5 shadow-xl sm:bottom-6 sm:-left-8 sm:w-auto sm:translate-x-0">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                  <FileText aria-hidden="true" className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    Your paste is ready
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    pastedump.com/p/hello-there
                  </p>
                </div>
                <Check
                  aria-hidden="true"
                  className="ml-auto size-4 shrink-0 text-emerald-600"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y bg-muted/30"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Small tool, big relief
              </p>
              <h2
                id="features-heading"
                className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl"
              >
                Sharing should be the easy part.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                No giant workspace to learn. Just the bits you need, right when
                you need them.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-36 size-80 rounded-full bg-emerald-400/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Ready when you are
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Got something to share?
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
                Make a paste, grab your link, and send it on its way.
              </p>
              <Link
                href="/pastes/new"
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-zinc-950 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Make a paste
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
