export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60)
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return formatDate(date);
}

/**
 * Production-grade number formatting with comprehensive error handling
 */
export function formatNumber(
  value: number | null | undefined | string,
  options?: {
    defaultValue?: string;
    compact?: boolean;
    fractionDigits?: number;
  },
): string {
  const {
    defaultValue = "0",
    compact = true,
    fractionDigits = 1,
  } = options || {};

  // Parse and validate
  let num: number;

  if (value === null || value === undefined) {
    return defaultValue;
  }

  if (typeof value === "string") {
    num = parseFloat(value);
    if (isNaN(num)) return defaultValue;
  } else if (typeof value === "number") {
    num = value;
    if (isNaN(num)) return defaultValue;
  } else {
    return defaultValue;
  }

  // Check for valid finite number
  if (!isFinite(num)) return defaultValue;

  // For small numbers or when not compact
  if (!compact) {
    return num.toString();
  }

  // Compact notation (K, M, B)
  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(fractionDigits) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(fractionDigits) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(fractionDigits) + "K";

  return num.toString();
}

// Type-safe number getter for API responses
export function safeNumber(value: unknown, defaultValue = 0): number {
  if (typeof value === "number" && !isNaN(value) && isFinite(value))
    return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && isFinite(parsed)) return parsed;
  }
  return defaultValue;
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}

export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
