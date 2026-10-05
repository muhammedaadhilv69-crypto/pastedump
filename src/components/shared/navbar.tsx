"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FileText, Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/mine", label: "My Pastes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full border-b bg-background/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground"
          aria-label="Pastedump home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText aria-hidden="true" className="size-4" />
          </span>
          <span className="text-lg">Pastedump</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/dashboard/mine"
                ? pathname === href || pathname.startsWith(`${href}/`)
                : pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            render={<Link href="/pastes/new" />}
            nativeButton={false}
            size="icon"
            className="sm:hidden"
            aria-label="New paste"
          >
            <Plus />
          </Button>
          <Button
            render={<Link href="/pastes/new" />}
            nativeButton={false}
            size="sm"
            className="hidden sm:inline-flex"
          >
            New paste
          </Button>
          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              onClick={() => setIsLoggedIn(false)}
            >
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsLoggedIn(true)}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
