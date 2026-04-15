// src/features/admin/utils/adminHelpers.ts

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? "s" : ""} ago`;
  }
  if (diffInHours < 48) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-500",
    APPROVED: "bg-green-500/10 text-green-500",
    REJECTED: "bg-red-500/10 text-red-500",
    REVIEWED: "bg-blue-500/10 text-blue-500",
    DISMISSED: "bg-gray-500/10 text-gray-500",
    ACTION_TAKEN: "bg-purple-500/10 text-purple-500",
  };
  return colors[status] || "bg-gray-500/10 text-gray-500";
};
