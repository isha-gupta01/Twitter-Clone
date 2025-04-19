import { format, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

export const getTweetTime = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", isoString);
    return "";
  }

  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}hr`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (now.getFullYear() === date.getFullYear()) {
    return format(date, "MMM d"); // e.g. "Apr 18"
  } else {
    return format(date, "MMM d, yyyy"); // e.g. "Apr 18, 2023"
  }
};
