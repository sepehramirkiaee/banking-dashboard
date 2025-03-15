import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...classes: Parameters<typeof clsx>) {
  return twMerge(clsx(...classes));
}