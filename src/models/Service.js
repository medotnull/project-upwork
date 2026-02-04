const z = required('zod');

const ServiceCreateSchema = z.object({
    title: z.string()
        .min(3, "Title must be atleast 3 characters")
        .max(255, "Title too long"),
    description: z.string()
        .min(10, "Description must be atleast 10 character"),
    category: z.string()
        .max(100, "Category too long"),
    pricingType: z.enum(['fixed', 'hourly'], {
        errorMap: () => ({ 
            message: "Pricing type must be fixed or hourly"
        })
    }),
    price: z.number()
        .posetive("Price must be posetive")
        .finite(),
    deliveryDays: z.number()
        .int()
        .posetive("Delivery days must be posetive")
        .max(365, "Delivery days cannot exceed 365")
})

const ServiceResponseSchema = z.object({
    id: z.string(),
    freelancerId: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pricingType: z.enum(['fixed', 'hourly']),
    price: z.number(),
    deliveryDays: z.number(),
    rating: z.number().default(0.0),
    totalReviews: z.number().default(0)
})

const ServiceRatingUpdateSchema = z.object({
  rating: z.number().min(0).max(5),
  totalReviews: z.number().int().min(0)
});

module.exports = {
    ServiceCreateSchema, 
    ServiceResponseSchema,
    ServiceRatingUpdateSchema
}