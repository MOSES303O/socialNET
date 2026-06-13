"use client";

import { create } from "zustand";
import type { DateRange } from "@/lib/types";

type Theme = "dark" | "light";

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  range: DateRange;
  setRange: (r: DateRange) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  togglePalette: () => void;
}

export const useUI = create<UIState>((set) => ({
  theme: "dark",
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
  setTheme: (theme) => set({ theme }),
  range: "7d",
  setRange: (range) => set({ range }),
  paletteOpen: false,
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),
}));

export const RANGE_LABELS: Record<DateRange, string> = {
  today: "24h",
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
  custom: "Custom",
};
