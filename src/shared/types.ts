import z from "zod";

export const ServiceSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string(),
  price_starting: z.string().nullable(),
  features: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const PortfolioItemSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  image_url: z.string().nullable(),
  client_name: z.string().nullable(),
  completion_date: z.string().nullable(),
  technologies: z.string().nullable(),
  is_featured: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ReservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_type: z.string().min(1, "Service type is required"),
  message: z.string().optional(),
  preferred_date: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  company: z.string(),
  role: z.string(),
  review: z.string(),
  rating: z.number(),
  photo_url: z.string().nullable(),
  is_featured: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CreateReservationSchema = ReservationSchema;

export type ServiceType = z.infer<typeof ServiceSchema>;
export type PortfolioItemType = z.infer<typeof PortfolioItemSchema>;
export type ReservationType = z.infer<typeof ReservationSchema>;
export type CreateReservationType = z.infer<typeof CreateReservationSchema>;
export type ReviewType = z.infer<typeof ReviewSchema>;
