"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const [from_to, setBg] = useState<string[]>([]);

  useEffect(() => {
    const from = [
      "from-red-500",
      "from-orange-500",
      "from-amber-500",
      "from-yellow-500",
      "from-lime-500",
      "from-green-500",
      "from-emerald-500",
      "from-teal-500",
      "from-cyan-500",
      "from-sky-500",
      "from-blue-500",
      "from-indigo-500",
      "from-violet-500",
      "from-purple-500",
      "from-fuchsia-500",
      "from-pink-500",
      "from-rose-500",
      "from-slate-500",
      "from-gray-500",
      "from-zinc-500",
      "from-neutral-500",
      "from-stone-500",
    ];
    const to = [
      "to-red-500",
      "to-orange-500",
      "to-amber-500",
      "to-yellow-500",
      "to-lime-500",
      "to-green-500",
      "to-emerald-500",
      "to-teal-500",
      "to-cyan-500",
      "to-sky-500",
      "to-blue-500",
      "to-indigo-500",
      "to-violet-500",
      "to-purple-500",
      "to-fuchsia-500",
      "to-pink-500",
      "to-rose-500",
      "to-slate-500",
      "to-gray-500",
      "to-zinc-500",
      "to-neutral-500",
      "to-stone-500",
    ];

    setBg([
      "bg-gradient-to-br",
      from[Math.floor(Math.random() * from.length)],
      to[Math.floor(Math.random() * to.length)],
    ]);
  }, []);

  return (
    <HeroUIProvider className={from_to.join(" ")} navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
