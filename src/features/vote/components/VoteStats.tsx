"use client";

import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface VoteStatsProps {
  upvotes: number;
  downvotes: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { text: "text-xs", icon: "h-3 w-3", value: "text-sm" },
  md: { text: "text-sm", icon: "h-4 w-4", value: "text-base" },
  lg: { text: "text-base", icon: "h-5 w-5", value: "text-xl" },
};

export function VoteStats({ upvotes, downvotes, size = "md" }: VoteStatsProps) {
  const netVotes = upvotes - downvotes;
  const totalVotes = upvotes + downvotes;
  const approvalRate = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;

  const getTrendIcon = () => {
    if (netVotes > 10) return <TrendingUp className={sizeClasses[size].icon} />;
    if (netVotes < -10)
      return <TrendingDown className={sizeClasses[size].icon} />;
    return <Minus className={sizeClasses[size].icon} />;
  };

  const getTrendColor = () => {
    if (netVotes > 0) return "text-green-500";
    if (netVotes < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <ArrowUp className={`${sizeClasses[size].icon} text-green-500`} />
          <span className={sizeClasses[size].value}>
            {upvotes.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <ArrowDown className={`${sizeClasses[size].icon} text-red-500`} />
          <span className={sizeClasses[size].value}>
            {downvotes.toLocaleString()}
          </span>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className={sizeClasses[size].text}>
            {netVotes > 0 ? `+${netVotes}` : netVotes}
          </span>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${approvalRate}%` }}
        />
      </div>

      <p className={`text-muted-foreground ${sizeClasses[size].text}`}>
        {approvalRate.toFixed(0)}% approval rate • {totalVotes.toLocaleString()}{" "}
        total votes
      </p>
    </div>
  );
}
