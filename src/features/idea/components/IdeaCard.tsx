"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  DollarSign,
} from "lucide-react";
import { formatNumber } from "@/lib/utils/format";
import { truncateText } from "@/features/admin/utils/adminHelpers";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    upvoteCount: number;
    downvoteCount: number;
    commentCount: number;
    viewCount: number;
    isPaid: boolean;
    price?: number;
    author: { name: string; image: string | null };
    category: { name: string; color: string | null };
  };
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between">
          <Badge
            style={{ backgroundColor: idea.category.color || undefined }}
            className="mb-2"
          >
            {idea.category.name}
          </Badge>
          {idea.isPaid && (
            <Badge variant="default" className="flex gap-1">
              <DollarSign className="h-3 w-3" />
              {idea.price}
            </Badge>
          )}
        </div>
        <Link href={`/ideas/${idea.id}`}>
          <CardTitle className="hover:text-primary line-clamp-2">
            {idea.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {truncateText(idea.description, 120)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex gap-1">
            <ArrowUp className="h-4 w-4 text-green-500" />
            {formatNumber(idea.upvoteCount)}
            <ArrowDown className="h-4 w-4 text-red-500 ml-2" />
            {formatNumber(idea.downvoteCount)}
          </div>
          <div className="flex gap-1">
            <MessageCircle className="h-4 w-4" />
            {formatNumber(idea.commentCount)}
          </div>
          <div className="flex gap-1">
            <Eye className="h-4 w-4" />
            {formatNumber(idea.viewCount)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={idea.author.image || ""} />
            <AvatarFallback>{idea.author.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {idea.author.name}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
