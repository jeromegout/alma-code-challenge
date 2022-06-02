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

export const hsl2rgb = (h: number, s: number, l: number) => {
  const buildRGB = (r: number, g: number, b: number, m: number) => {
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
  };

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
  if (status === "ready") return "green";
  if (status === "paid") return "violet";
  if (status === "not_started") return "red";
  if (status === "in_progress") return "yellow";
  else return "gray";
};

export const getReadableStatus = (status: PaymentStatus): string => {
  if (status === "ready") return "Ready";
  if (status === "paid") return "Piad";
  if (status === "not_started") return "Not started";
  if (status === "in_progress") return "In progress";
  else return "Default";
};

export const getPaidIndex = (plans: PaymentPlan[] = []): number => {
  let index = 0;
  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    if (plan.status === "ready" || plan.status === "paid") index = i;
  }
  return index;
};
