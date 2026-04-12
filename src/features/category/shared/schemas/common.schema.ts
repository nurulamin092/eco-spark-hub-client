import { z } from "zod";

export const categoryNameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

export const categoryDescriptionSchema = z
  .string()
  .max(500, "Description cannot exceed 500 characters")
  .optional();

export const categoryIconSchema = z
  .string()
  .max(50, "Icon name too long")
  .optional();

export const categoryColorSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format")
  .optional();
