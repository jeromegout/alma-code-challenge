import { format } from "date-fns";
import { PaymentPlan, PaymentStatus } from "./types/Payment";

export const formatAmount = (amount: number): string => {
  const st = amount.toFixed();
  const cents = st.slice(-2);
  const dollars = st.slice(0, -2);
  return `$${dollars}.${cents}`;
};

export const formatDate = (date: number, fmt = "yyyy-MMM-dd"): string => {
  return format(new Date(date), fmt);
};

export const getAvatarLetters = (txt: string): string => {
  const parts = txt.split(" ");
  if (parts.length === 1) return txt.charAt(0).toUpperCase();
  else if (parts.length >= 2)
    return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
  else return "";
};

export const hslCouple = (h: number, s: number, l: number) => {
  return [
    [h, s, l],
    [(h + 30) % 360, s, l],
  ];
};

const buildRGB = (r: number, g: number, b: number, m: number) => {
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
};

export const hsl2rgb = (h: number, s: number, l: number) => {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;
  if (0 <= h && h < 60) {
    return buildRGB(C, X, 0, m);
  } else if (60 <= h && h < 120) {
    return buildRGB(X, C, 0, m);
  } else if (120 <= h && h < 180) {
    return buildRGB(0, C, X, m);
  } else if (180 <= h && h < 240) {
    return buildRGB(0, X, C, m);
  } else if (240 <= h && h < 300) {
    return buildRGB(X, 0, C, m);
  } else {
    // 300 <= h < 360
    return buildRGB(C, 0, X, m);
  }
};

export const getColorByStatus = (status: PaymentStatus): string => {
  switch (status) {
    case "ready":
      return "green";
    case "paid":
      return "violet";
    case "not_started":
      return "red";
    case "in_progress":
      return "yellow";
    default:
      return "gray";
  }
};

export const getReadableStatus = (status: PaymentStatus): string => {
  switch (status) {
    case "ready":
      return "Ready";
    case "paid":
      return "Paid";
    case "not_started":
      return "Not started";
    case "in_progress":
      return "In progress";
    default:
      return "Default";
  }
};

export const getAllPaymentStatus = (): PaymentStatus[] => {
  return ["default", "in_progress", "not_started", "paid", "ready"];
};

export const getPaidIndex = (plans: PaymentPlan[] = []): number => {
  let index = 0;
  plans.forEach((plan, i) => {
    if (plan.status === "ready" || plan.status === "paid") index = i;
  });
  return index;
};
