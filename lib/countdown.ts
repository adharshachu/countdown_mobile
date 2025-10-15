import { differenceInSeconds } from "date-fns";

export type Remaining = { days:number; hours:number; minutes:number; seconds:number; total:number };

export function getRemaining(targetISO: string): Remaining {
  const total = Math.max(differenceInSeconds(new Date(targetISO), new Date()), 0);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds, total };
}
