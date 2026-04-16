import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z
    .string()
    .max(300, "Excerpt cannot exceed 300 characters")
    .optional(),
  featuredImage: z.string().url("Invalid image URL").optional(),
  images: z.array(z.unknown()).optional(),
  videoUrl: z.string().url("Invalid video URL").optional(),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z
    .string()
    .max(70, "Meta title cannot exceed 70 characters")
    .optional(),
  metaDescription: z
    .string()
    .max(160, "Meta description cannot exceed 160 characters")
    .optional(),
  metaKeywords: z.string().optional(),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  isFeatured: z.boolean().optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(5000),
  blogId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;
export type UpdateBlogFormValues = z.infer<typeof updateBlogSchema>;
export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;
