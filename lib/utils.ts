import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  if (currency === "INR") {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

    // Convert to lakhs/crores format
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return formatted;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+91")) {
    const number = cleaned.substring(3);
    if (number.length === 10) {
      return `+91-${number.substring(0, 5)}-${number.substring(5)}`;
    }
  }
  return phone;
}