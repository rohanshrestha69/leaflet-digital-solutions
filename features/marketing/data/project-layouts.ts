// features/marketing/data/project-layouts.ts

export type BentoSize = "sm" | "md" | "lg" | "xl"

/**
 * Bento layout map — creates visual rhythm across the grid.
 *
 * Pattern reads like:
 *   xl  sm
 *   sm  lg  md
 *   md  sm  sm
 *   sm  xl
 */
export const bentoLayout: Record<string, BentoSize> = {
  hallo:     "xl", // 2×2 hero card
  fabio:     "sm",
  northwind: "lg", // 1×2 tall
  atlas:     "sm",
  lumen:     "md", // 2×1 wide
  vision:    "sm",
  orbit:     "md", // 2×1 wide
  ember:     "sm",
  kova:      "lg", // 1×2 tall
  fold:      "sm",
  north:     "sm",
  harbor:    "lg", // 2×1 wide
}

export function getLayout(id: string): BentoSize {
  return bentoLayout[id] ?? "sm"
}