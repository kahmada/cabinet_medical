import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function st(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}
